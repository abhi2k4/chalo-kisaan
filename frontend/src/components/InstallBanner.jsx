import React, { useState, useEffect } from 'react';
import './InstallBanner.css';

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed (running in standalone mode)
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true;

    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    setIsIOS(ios);

    if (ios) {
      // Show manual iOS instructions after 3 seconds
      const timer = setTimeout(() => setShowBanner(true), 3000);
      return () => clearTimeout(timer);
    }

    // Android/Chrome: listen for beforeinstallprompt
    const handler = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowBanner(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // If already added to home screen
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowBanner(false);
    });

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
    }
    setShowBanner(false);
    setDeferredPrompt(null);
  };

  if (isInstalled || !showBanner) return null;

  return (
    <div className="install-banner">
      <div className="install-banner__icon">🌾</div>
      <div className="install-banner__content">
        <div className="install-banner__title">Install Chalo Kisaan</div>
        {isIOS ? (
          <div className="install-banner__ios">
            Tap <span className="install-banner__share-icon">⎋</span> then
            <strong> "Add to Home Screen"</strong>
          </div>
        ) : (
          <div className="install-banner__sub">
            Add to home screen for app experience
          </div>
        )}
      </div>
      {!isIOS && (
        <button className="install-banner__btn" onClick={handleInstall}>
          Install
        </button>
      )}
      <button className="install-banner__close" onClick={() => setShowBanner(false)}>
        ✕
      </button>
    </div>
  );
}
