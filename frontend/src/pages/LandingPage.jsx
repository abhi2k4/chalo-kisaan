import React, { useState, useEffect, useRef } from 'react';
import {
  IconUsers, IconTrendingUp, IconLeaf,
  IconMicrophone, IconRobot, IconPhoto,
  IconCurrencyRupee, IconBuilding, IconFileText,
} from '@tabler/icons-react';
import logoPrimary from '../assets/logo-primary.png';
import Narrator from '../components/Narrator';
import { useNarrator } from '../hooks/useNarrator';
import { useLanguage } from '../context/LanguageContext';
import './LandingPage.css';

// ── Multilingual phrases for the cycling typewriter ────────────────────────
const CYCLE_PHRASES = [
  { text: 'AI-powered agritourism planning',        lang: 'en' },
  { text: 'AI-संचालित कृषि पर्यटन योजना',            lang: 'hi' },
  { text: 'AI-સંચાલિત કૃષિ પર્યટન આયોજન',            lang: 'gu' },
  { text: 'AI-चालित कृषी पर्यटन नियोजन',              lang: 'mr' },
  { text: 'AI-ਸੰਚਾਲਿਤ ਖੇਤੀ ਸੈਰ-ਸਪਾਟਾ ਯੋਜਨਾਬੰਦੀ',      lang: 'pa' },
];

const TYPE_SPEED   = 50;   // ms per character while typing
const DELETE_SPEED = 35;   // ms per character while deleting
const HOLD_MS      = 2500; // pause after fully typed
const PAUSE_MS     = 300;  // pause after fully deleted

function TypewriterCycle() {
  const [phraseIdx, setPhraseIdx]   = useState(0);
  const [displayed, setDisplayed]   = useState('');
  const timeoutRef = useRef(null);
  const charIdxRef = useRef(0);
  const phaseRef = useRef('typing'); // typing | holding | deleting | pausing

  useEffect(() => {
    const full = CYCLE_PHRASES[phraseIdx].text;
    charIdxRef.current = 0;
    phaseRef.current = 'typing';
    setDisplayed('');

    const animate = () => {
      if (phaseRef.current === 'typing') {
        if (charIdxRef.current < full.length) {
          charIdxRef.current += 1;
          setDisplayed(full.slice(0, charIdxRef.current));
          timeoutRef.current = setTimeout(animate, TYPE_SPEED);
        } else {
          phaseRef.current = 'holding';
          timeoutRef.current = setTimeout(animate, HOLD_MS);
        }
      } else if (phaseRef.current === 'holding') {
        phaseRef.current = 'deleting';
        animate();
      } else if (phaseRef.current === 'deleting') {
        if (charIdxRef.current > 0) {
          charIdxRef.current -= 1;
          setDisplayed(full.slice(0, charIdxRef.current));
          timeoutRef.current = setTimeout(animate, DELETE_SPEED);
        } else {
          phaseRef.current = 'pausing';
          timeoutRef.current = setTimeout(animate, PAUSE_MS);
        }
      } else if (phaseRef.current === 'pausing') {
        setPhraseIdx(i => (i + 1) % CYCLE_PHRASES.length);
      }
    };

    timeoutRef.current = setTimeout(animate, 100);

    return () => clearTimeout(timeoutRef.current);
  }, [phraseIdx]);

  const langAttr = CYCLE_PHRASES[phraseIdx].lang;

  return (
    <em className="landing__typewriter" lang={langAttr}>
      {displayed}
      <span className="landing__cursor" aria-hidden="true" />
    </em>
  );
}

const STATS = [
  { value: '8.6 Cr',  label: 'Marginal farmers in India',          Icon: IconUsers },
  { value: '₹2 Lakh', label: 'Avg. annual side income potential',  Icon: IconTrendingUp },
  { value: '73%',     label: 'Farms with agritourism potential',    Icon: IconLeaf },
];

const FEATURES = [
  { Icon: IconMicrophone,    title: 'Voice Input',        desc: 'Speak in Hindi, Marathi or English. No typing required.', color: '#FF6B6B' },
  { Icon: IconRobot,         title: 'AI Business Plan',   desc: 'Step-by-step agritourism plan tailored to your land.', color: '#4ECDC4' },
  { Icon: IconPhoto,         title: 'Farm Visualisation', desc: 'See how your farm looks after transformation.', color: '#45B7D1' },
  { Icon: IconCurrencyRupee, title: 'Revenue Forecast',   desc: 'Realistic income projections and break-even analysis.', color: '#96CEB4' },
  { Icon: IconBuilding,      title: 'Govt. Schemes',      desc: 'Schemes and subsidies you are eligible for.', color: '#FFEAA7' },
  { Icon: IconFileText,      title: 'Bank-Ready Report',  desc: 'Download a detailed PDF plan for loan applications.', color: '#DDA0DD' },
];

export default function LandingPage({ onStart, language = 'hindi' }) {
  const { isSpeaking, isSupported, narratePage, stop } = useNarrator(language);
  const { t } = useLanguage();

  return (
    <div className="landing">

      <Narrator
        isSpeaking={isSpeaking}
        isSupported={isSupported}
        onSpeak={() => narratePage('landing')}
        onStop={stop}
      />

      <header className="landing__header">
        <div className="landing__logo">
          <img
            src={logoPrimary}
            alt="Chalo Kisaan Logo"
            className="landing__logo-emblem"
          />
          <div>
            <div className="landing__logo-name">Chalo Kisaan</div>
            <div className="landing__logo-tagline">{t('landing_tagline')}</div>
          </div>
        </div>
        <div className="landing__header-rule" />
      </header>

      <section className="landing__hero anim-fade-up">
        <div className="landing__hero-inner">
          <div className="landing__hero-kicker stamp" style={{ color: 'var(--g-500)', borderColor: 'var(--g-500)' }}>
            AI-Powered · Free to Use · Voice First
          </div>
          <h1 className="landing__headline">
            {t('landing_tagline')}<br />
            <TypewriterCycle />
          </h1>
          <button className="landing__cta btn-primary" onClick={onStart}>
            {t('landing_start')}
            <span className="landing__cta-arrow">→</span>
          </button>
          <p className="landing__cta-note text-muted">
            Works on mobile &nbsp;·&nbsp; Free to use &nbsp;·&nbsp; Results in 60 seconds
          </p>
        </div>

        <div className="landing__hero-panel">
          <div className="landing__panel-header">
            <span className="landing__panel-dot landing__panel-dot--saffron" />
            <span className="landing__panel-dot landing__panel-dot--forest" />
            <span className="landing__panel-dot landing__panel-dot--terracotta" />
            <span className="landing__panel-label">Sample Output</span>
          </div>
          <div className="landing__panel-body">
            <div className="landing__panel-service">Vineyard Farm Stay</div>
            <div className="landing__panel-location">Near Nashik, Maharashtra · 5 acres</div>
            <div className="landing__panel-rule rule-gold" />
            <div className="landing__panel-rows">
              {[
                ['Suitability Score', '87 / 100'],
                ['Setup Investment', '₹2.4 Lakh'],
                ['Monthly Revenue', '₹38,000'],
                ['Break-Even', '8 months'],
              ].map(([k, v]) => (
                <div key={k} className="landing__panel-row">
                  <span className="landing__panel-key">{k}</span>
                  <span className="landing__panel-val">{v}</span>
                </div>
              ))}
            </div>
            <div className="landing__panel-rule rule-gold" />
            <div className="landing__panel-phases">
              <div className="landing__panel-phase-label">Setup Plan</div>
              {['Land Preparation · 2 weeks', 'Build Tent Cottages · 4 weeks', 'Tourist Booking Setup · 1 week'].map(p => (
                <div key={p} className="landing__panel-phase">
                  <span className="landing__panel-tick">✓</span> {p}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="landing__stats">
        <div className="landing__stats-rule rule-double" />
        <div className="landing__stats-grid">
          {STATS.map(({ value, label, Icon }, i) => (
            <div key={i} className="landing__stat" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="landing__stat-icon">
                <Icon size={26} stroke={1.5} color="var(--forest)" />
              </div>
              <div className="landing__stat-value">{value}</div>
              <div className="landing__stat-label">{label}</div>
            </div>
          ))}
        </div>
        <div className="landing__stats-rule rule-double" />
      </section>

      <section className="landing__features">
        <h2 className="landing__features-title">What Chalo Kisaan Does For You</h2>
        <div className="landing__features-grid">
          {FEATURES.map(({ Icon, title, desc, color }, i) => (
            <div key={i} className="landing__feature" style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="landing__feature-icon" style={{ backgroundColor: `${color}20`, color }}>
                <Icon size={28} stroke={1.5} />
              </div>
              <div className="landing__feature-title">{title}</div>
              <div className="landing__feature-desc">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="landing__cta-strip">
        <div className="landing__cta-strip-inner">
          <div className="landing__cta-strip-text">
            <span className="landing__cta-strip-en">Built for India's 8.6 crore marginal farmers</span>
          </div>
          <button className="btn-primary" onClick={onStart}>{t('landing_start')} &nbsp;→</button>
        </div>
      </section>

      <footer className="landing__footer">
        <div className="rule-gold" />
        <p>Transforming Indian agriculture through technology &nbsp;·&nbsp; v1.0</p>
      </footer>
    </div>
  );
}
