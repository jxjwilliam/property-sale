"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getFilteredItems } from "@/config/gallery";
import { useLocale } from "@/i18n/provider";
import { Filmstrip } from "./filmstrip";
import { HeroViewer } from "./hero-viewer";

export function Gallery() {
  const { messages, format } = useLocale();
  const g = messages.gallery;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const items = getFilteredItems("all");

  const step = useCallback(
    (delta: number) => {
      if (!items.length) return;
      setCurrentIndex((prev) => (prev + delta + items.length) % items.length);
    },
    [items.length],
  );

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    if (!playing) return;
    timerRef.current = setInterval(() => step(1), 5000);
  }, [clearTimer, playing, step]);

  const handlePrev = useCallback(() => {
    step(-1);
    startTimer();
  }, [step, startTimer]);

  const handleNext = useCallback(() => {
    step(1);
    startTimer();
  }, [step, startTimer]);

  const handleTogglePlay = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  const handleSelect = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      startTimer();
    },
    [startTimer],
  );

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [playing, startTimer, clearTimer]);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden) {
        clearTimer();
      } else if (playing) {
        startTimer();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [playing, clearTimer, startTimer]);

  const counter =
    items.length > 0
      ? format(g.slideCounter, {
          current: String(currentIndex + 1).padStart(2, "0"),
          total: String(items.length).padStart(2, "0"),
        })
      : "0 / 0";

  return (
    <aside className="panel" aria-label="Current slide preview">
      <HeroViewer
        items={items}
        currentIndex={currentIndex}
        playing={playing}
        onPrev={handlePrev}
        onNext={handleNext}
        onTogglePlay={handleTogglePlay}
        onPause={clearTimer}
        onResume={startTimer}
      />

      <div className="status-row">
        <span className="badge">{counter}</span>
        <span className="badge">{g.tapToJump}</span>
      </div>

      <section aria-label="Frame carousel">
        <div className="section-head">
          <div>
            <h2>{g.carouselTitle}</h2>
          </div>
          <p>{g.carouselHint}</p>
        </div>
        <Filmstrip items={items} activeIndex={currentIndex} onSelect={handleSelect} />
      </section>
    </aside>
  );
}
