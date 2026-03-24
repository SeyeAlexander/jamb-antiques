"use client";

import { useEffect, useState } from "react";

const INTRO_DURATION_MS = 2600;

export function SiteIntro() {
  const [showIntro, setShowIntro] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    setShowIntro(true);
    document.body.classList.add("jamb-intro-active");

    const leaveTimer = window.setTimeout(() => setIsLeaving(true), INTRO_DURATION_MS);
    const hideTimer = window.setTimeout(() => {
      setShowIntro(false);
      document.body.classList.remove("jamb-intro-active");
    }, INTRO_DURATION_MS + 650);

    return () => {
      document.body.classList.remove("jamb-intro-active");
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
      <main className='flex min-h-screen items-center justify-center px-6 text-center'>
        <div className='flex w-full max-w-md flex-col items-center gap-6'>
          <p className='jamb-loading-wordmark text-7xl leading-none text-black'>Jamb.</p>
          <div className='h-px w-full overflow-hidden bg-jamb-line'>
            <div className='jamb-loading-line h-full w-full bg-black' />
          </div>
          <p className='text-xs font-medium tracking-[0.28em] uppercase text-jamb-ink-muted'>
            Curating the collection
          </p>
        </div>
      </main>
    </div>
  );
}
