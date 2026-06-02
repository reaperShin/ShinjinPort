"use client";

import styles from "@/app/landing.module.css";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import Header from "@/components/header";

// Grass
import backgrass from "@/components/assets/backgrass.png";
import frontgrass from "@/components/assets/frontgrass.png";

// Knight
import knight1 from "@/components/assets/knight1.png";
import knight2 from "@/components/assets/knight2.png";

export default function Home() {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);   // 0 = Knight1 state, 1 = Knight2 state
  const currentRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Smooth lerp toward target on every frame
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      const next = lerp(currentRef.current, targetRef.current, 0.06);
      const diff = Math.abs(next - currentRef.current);

      if (diff > 0.0002) {
        currentRef.current = next;
        setProgress(next);
        rafRef.current = requestAnimationFrame(tick);
      } else {
        // Snap to exact target when close enough
        currentRef.current = targetRef.current;
        setProgress(targetRef.current);
        rafRef.current = null;
      }
    };

    // Wheel: one scroll down → animate to Knight2, one scroll up → animate to Knight1
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      targetRef.current = e.deltaY > 0 ? 1 : 0;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    // Touch support
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const delta = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(delta) < 10) return; // ignore tiny taps
      targetRef.current = delta > 0 ? 1 : 0;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const scene = sceneRef.current;
    // Use the scene element so it doesn't intercept scroll on other pages
    scene?.addEventListener("wheel", handleWheel, { passive: false });
    scene?.addEventListener("touchstart", handleTouchStart, { passive: true });
    scene?.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      scene?.removeEventListener("wheel", handleWheel);
      scene?.removeEventListener("touchstart", handleTouchStart);
      scene?.removeEventListener("touchend", handleTouchEnd);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Scroll-driven values (ONLY knights + frontgrass) ──────────
  const knightScale = 1 + progress * 0.2;           // 1.0 → 1.35
  const grassScale = 1 + progress * 0.2;            // 1.0 → 1.20
  const k1Opacity = Math.max(0, 1 - progress * 1.6); // fades out by ~62%
  const k2Opacity = Math.min(1, Math.max(0, (progress - 0.25) * 2)); // fades in after 25%

  return (
    <div className={styles.fullContainer} ref={sceneRef}>
      <Header />

      {/* Description — completely static */}
      <div className={styles.descriptionContainer}>
        <p>&quot;Best systems operates flawlessly in the dark&quot;</p>
      </div>

      {/* Only these elements react to scroll */}
      <div className={styles.knightContainer}>
        {/* Back grass — static */}
        <Image src={backgrass} alt="Back Grass" className={styles.backgrass} />

        {/* Front grass — zoom only */}
        <Image
          src={frontgrass}
          alt="Front Grass"
          className={styles.frontgrass}
          style={{
            transform: `translateY(1vw) scale(${grassScale})`,
            transformOrigin: "bottom center",
          }}
        />

        {/* Knight 1 — zooms in + fades out */}
        <Image
          src={knight1}
          alt="First Knight"
          className={styles.knight}
          style={{
            opacity: k1Opacity,
            transform: `scale(${knightScale})`,
            transformOrigin: "center bottom",
          }}
        />

        {/* Knight 2 — same position, zooms in + fades in */}
        <Image
          src={knight2}
          alt="Second Knight"
          className={`${styles.knight} ${styles.knightOverlay}`}
          style={{
            opacity: k2Opacity,
            transform: `scale(${knightScale})`,
            transformOrigin: "center bottom",
          }}
        />
      </div>

      {/* Title — completely static */}
      <div className={styles.titleContainer}>
        <h3>SHADOW</h3>
        <h1>ARCHITECT</h1>
      </div>
    </div>
  );
}
