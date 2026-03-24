"use client";

import { useEffect, useState } from "react";

const INTRO_KEY = "jamb-intro-seen";
const INTRO_DURATION_MS = 1600;

export function SiteIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const hasSeenIntro = window.sessionStorage.getItem(INTRO_KEY) === "true";

    if (hasSeenIntro) {
      return;
    }

    setShowIntro(true);
    window.sessionStorage.setItem(INTRO_KEY, "true");

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), INTRO_DURATION_MS);
    const hideTimer = window.setTimeout(() => setShowIntro(false), INTRO_DURATION_MS + 500);

    return () => {
      window.clearTimeout(leaveTimer);
      window.clearTimeout(hideTimer);
    };
  }, []);

  if (!showIntro) {
    return null;
  }

  return (
    <div
      aria-hidden='true'
      className={`jamb-intro-screen ${isLeaving ? "is-leaving" : ""}`}
    >
      <div className='jamb-intro-frame'>
        <div className='jamb-intro-panel'>
          <p className='jamb-intro-name'>Jamb</p>
        </div>

        <div className='jamb-intro-mark'>
          <p className='jamb-intro-wordmark'>Jamb</p>
          <p className='jamb-intro-caption'>Antiques and architectural salvage</p>
        </div>

        <div className='jamb-intro-panel'>
          <p className='jamb-intro-name'>Curated interiors</p>
        </div>
      </div>
    </div>
  );
}
