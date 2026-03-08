import { useState, useEffect, useRef, useCallback } from 'react';

const SUPPORTED_LANGS = {
  english: 'en-IN',
  hindi:   'hi-IN',
  marathi: 'mr-IN',
  punjabi: 'pa-IN',
  gujarati:'gu-IN',
  telugu:  'te-IN',
  kannada: 'kn-IN',
  tamil:   'ta-IN',
};

// Errors that are transient — worth retrying automatically
// NOTE: 'network' removed — on HTTPS localhost the Google speech service
// is unreachable; retrying endlessly just spams the console.
const RETRYABLE_ERRORS = new Set(['service-not-allowed', 'aborted']);
const MAX_RETRIES = 2;
const RETRY_DELAY_MS = 1000;

export function useVoiceInput(language = 'english') {
  const [isListening,       setIsListening]       = useState(false);
  const [transcript,        setTranscript]        = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [error,             setError]             = useState(null);
  const [isSupported,       setIsSupported]       = useState(false);
  // true when the Google speech network endpoint is unreachable (HTTPS/network issue)
  const [networkUnavailable, setNetworkUnavailable] = useState(false);

  const recognitionRef  = useRef(null);
  const shouldRunRef    = useRef(false);   // true while user wants recording ON
  const retryCountRef   = useRef(0);
  const retryTimerRef   = useRef(null);
  const langRef         = useRef(SUPPORTED_LANGS[language] || 'en-IN');

  // keep langRef in sync so restarts pick up new language
  useEffect(() => {
    langRef.current = SUPPORTED_LANGS[language] || 'en-IN';
  }, [language]);

  const SpeechRecognition =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;

  useEffect(() => {
    setIsSupported(!!SpeechRecognition);
  }, [SpeechRecognition]);

  /** Build a fresh recognition instance and wire up all handlers */
  const buildRecognition = useCallback(() => {
    if (!SpeechRecognition) return null;

    const rec = new SpeechRecognition();
    rec.continuous      = true;
    rec.interimResults  = true;
    rec.lang            = langRef.current;
    rec.maxAlternatives = 1;

    rec.onstart = () => {
      setIsListening(true);
      setError(null);
      retryCountRef.current = 0;   // successful start resets retry counter
    };

    rec.onresult = (event) => {
      let final = '';
      let interim = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const r = event.results[i];
        if (r.isFinal) final   += r[0].transcript + ' ';
        else           interim += r[0].transcript;
      }
      if (final) setTranscript(prev => prev + final);
      setInterimTranscript(interim);
    };

    rec.onerror = (event) => {
      const errCode = event.error;

      // 'network' = Google speech servers unreachable (common on HTTPS localhost
      // or when the device has no access to Google APIs). Stop immediately —
      // retrying will never help and just floods the console.
      if (errCode === 'network') {
        console.warn('[VoiceInput] Network error: Google Speech API unreachable. Switch to text input.');
        setNetworkUnavailable(true);
        setError('network');
        setIsListening(false);
        shouldRunRef.current = false;
        clearTimeout(retryTimerRef.current);
        recognitionRef.current?.abort();
        return;
      }

      if (shouldRunRef.current && RETRYABLE_ERRORS.has(errCode) && retryCountRef.current < MAX_RETRIES) {
        console.log(`[VoiceInput] Retrying (attempt ${retryCountRef.current + 1}/${MAX_RETRIES})...`);
        retryCountRef.current += 1;
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = setTimeout(() => {
          if (!shouldRunRef.current) return;
          try {
            recognitionRef.current = buildRecognition();
            recognitionRef.current?.start();
          } catch { /* ignore */ }
        }, RETRY_DELAY_MS * retryCountRef.current);
      } else {
        console.error('[VoiceInput] Speech recognition failed:', errCode);
        setError(errCode);
        setIsListening(false);
        shouldRunRef.current = false;
      }
    };

    rec.onend = () => {
      setInterimTranscript('');
      // If user hasn't explicitly stopped, restart immediately (handles Chrome's
      // ~60-second auto-stop and any silent-period shutdowns)
      if (shouldRunRef.current) {
        clearTimeout(retryTimerRef.current);
        retryTimerRef.current = setTimeout(() => {
          if (!shouldRunRef.current) return;
          try {
            recognitionRef.current = buildRecognition();
            recognitionRef.current?.start();
          } catch { /* ignore */ }
        }, 150);
      } else {
        setIsListening(false);
      }
    };

    return rec;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SpeechRecognition]);

  // Abort everything when the hook unmounts
  useEffect(() => {
    return () => {
      shouldRunRef.current = false;
      clearTimeout(retryTimerRef.current);
      recognitionRef.current?.abort();
    };
  }, []);

  const startListening = useCallback(() => {
    if (!SpeechRecognition) {
      console.error('[VoiceInput] SpeechRecognition not available');
      return;
    }
    console.log('[VoiceInput] Starting listening in language:', langRef.current);
    setTranscript('');
    setInterimTranscript('');
    setError(null);
    setNetworkUnavailable(false);
    retryCountRef.current  = 0;
    shouldRunRef.current   = true;

    recognitionRef.current?.abort();
    recognitionRef.current = buildRecognition();
    try {
      recognitionRef.current?.start();
      console.log('[VoiceInput] Recognition started successfully');
    } catch (err) {
      console.error('[VoiceInput] Error starting recognition:', err);
    }
  }, [buildRecognition, SpeechRecognition]);

  const stopListening = useCallback(() => {
    shouldRunRef.current = false;
    clearTimeout(retryTimerRef.current);
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setInterimTranscript('');
  }, []);

  return {
    isListening,
    transcript,
    interimTranscript,
    error,
    isSupported,
    networkUnavailable,
    startListening,
    stopListening,
    resetTranscript,
    supportedLanguages: SUPPORTED_LANGS,
  };
}
