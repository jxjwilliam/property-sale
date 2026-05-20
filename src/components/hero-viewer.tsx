"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { GalleryImage } from "@/config/gallery";
import { useLocale } from "@/i18n/provider";

interface HeroViewerProps {
  items: GalleryImage[];
  currentIndex: number;
  playing: boolean;
  onPrev: () => void;
  onNext: () => void;
  onTogglePlay: () => void;
  onPause: () => void;
  onResume: () => void;
}

export function HeroViewer({
  items,
  currentIndex,
  playing,
  onPrev,
  onNext,
  onTogglePlay,
  onPause,
  onResume,
}: HeroViewerProps) {
  const { messages } = useLocale();
  const frameRef = useRef<HTMLDivElement>(null);
  const switchingRef = useRef(false);
  const [brokenUrl, setBrokenUrl] = useState<string | null>(null);

  const current = items[currentIndex];
  const isBroken = Boolean(current?.url && brokenUrl === current.url);

  const showSwitch = useCallback(() => {
    if (switchingRef.current) return;
    switchingRef.current = true;
    frameRef.current?.classList.add("is-switching");
    window.setTimeout(() => {
      switchingRef.current = false;
      frameRef.current?.classList.remove("is-switching");
    }, 220);
  }, []);

  useEffect(() => {
    if (!current?.url) return;
    showSwitch();
  }, [currentIndex, current?.url, showSwitch]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const tagName = target?.tagName;
      if (
        target?.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT" ||
        tagName === "BUTTON"
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        onTogglePlay();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onPrev, onNext, onTogglePlay]);

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const pause = () => onPause();
    const resume = () => onResume();
    el.addEventListener("mouseenter", pause);
    el.addEventListener("focusin", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusout", resume);
    return () => {
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusout", resume);
    };
  }, [onPause, onResume]);

  if (!current) {
    return (
      <div className="hero-frame flex items-center justify-center">
        <p className="text-muted-foreground">{messages.gallery.noImages}</p>
      </div>
    );
  }

  return (
    <div className="hero-frame">
      <div className="hero-frame-inner" ref={frameRef}>
        {isBroken ? (
          <div className="hero-placeholder">{messages.gallery.photoUnavailable}</div>
        ) : (
          <img
            key={current.url}
            src={current.url}
            alt={`${current.caption} from ${current.source}`}
            decoding="async"
            className="hero-image"
            onError={() => setBrokenUrl(current.url)}
          />
        )}
        <div className="hero-overlay">
          <div className="controls" aria-label="Gallery controls">
            <button
              type="button"
              onClick={onPrev}
              aria-label="Previous image"
              className="control"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={onNext}
              aria-label="Next image"
              className="control"
            >
              ›
            </button>
            <button
              type="button"
              onClick={onTogglePlay}
              aria-label={playing ? "Pause autoplay" : "Resume autoplay"}
              className="control"
            >
              {playing ? "❚❚" : "▶"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
