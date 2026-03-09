import React from 'react';
import './PhoneMockup.css';

/**
 * PhoneMockup — Desktop-only phone frame wrapper for demo purposes
 * Wraps the entire app content in a CSS phone mockup on desktop screens.
 * On mobile, this component is completely transparent (no visual changes).
 */
const PhoneMockup = ({ children }) => {
  // Get current time for status bar
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

  return (
    <div className="phone-mockup-container">
      {/* Desktop background with branding */}
      <div className="phone-mockup-bg">
        <div className="phone-mockup-branding">
          <div className="phone-mockup-branding__dot" />
          <span className="phone-mockup-branding__text">Chalo Kisaan</span>
          <span className="phone-mockup-branding__divider">•</span>
          <span className="phone-mockup-branding__demo">Live Demo</span>
        </div>
      </div>

      {/* Phone frame */}
      <div className="phone-mockup">
        {/* Side buttons are CSS ::before/::after */}

        {/* Screen — flex column: status bar → scrollable content → bottom nav */}
        <div className="phone-mockup__screen">

          {/* ── Status Bar (inside the screen, above content) ── */}
          <div className="phone-mockup__status-bar">
            <span className="phone-mockup__status-time">{timeStr}</span>
            {/* Dynamic island cutout area */}
            <div className="phone-mockup__dynamic-island">
              <div className="phone-mockup__speaker" />
              <div className="phone-mockup__camera" />
            </div>
            <div className="phone-mockup__status-icons">
              {/* Signal bars */}
              <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
                <rect x="0"  y="8" width="3" height="4" rx="1" fill="currentColor" opacity="0.4"/>
                <rect x="4"  y="5" width="3" height="7" rx="1" fill="currentColor" opacity="0.6"/>
                <rect x="8"  y="2" width="3" height="10" rx="1" fill="currentColor" opacity="0.8"/>
                <rect x="12" y="0" width="3" height="12" rx="1" fill="currentColor"/>
              </svg>
              {/* WiFi */}
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                <path d="M8 9.5a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3z" fill="currentColor"/>
                <path d="M4.2 7.3A5.4 5.4 0 0 1 8 5.8c1.5 0 2.8.6 3.8 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                <path d="M1.5 4.6A9 9 0 0 1 8 2c2.5 0 4.7 1 6.5 2.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5"/>
              </svg>
              {/* Battery */}
              <svg width="25" height="12" viewBox="0 0 25 12" fill="none">
                <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" stroke="currentColor" strokeOpacity="0.35"/>
                <rect x="2"   y="2"   width="16" height="8" rx="2" fill="currentColor"/>
                <path d="M23 4v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.4"/>
              </svg>
            </div>
          </div>

          {/* ── App Content area ── */}
          {/* .phone-mockup__body is flex row filler; inside: scrollable area + absolutely-pinned bottom-nav */}
          <div className="phone-mockup__body">
            <div className="phone-mockup__scroll">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;
