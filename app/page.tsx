"use client";

import styles from "@/app/landing.module.css";
import Image from "next/image";
import Link from "next/link";
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

  // ── Scroll-driven values (knights, frontgrass, titles) ──────────
  const knightScale = 1 + progress * 0.2;           // 1.0 → 1.35
  const grassScale = 1 + progress * 0.2;            // 1.0 → 1.20
  const k1Opacity = Math.max(0, 1 - progress * 1.6); // fades out by ~62%
  const k2Opacity = Math.min(1, Math.max(0, (progress - 0.25) * 2)); // fades in after 25%
  
  // Title & description fade out as we transition to the second page
  const titleOpacity = Math.max(0, 1 - progress * 2.5); // completely gone by 40% progress
  const descOpacity = Math.max(0, 1 - progress * 2.5);

  // Trigger HUD active states when the second knight becomes dominant
  const showSecondHUD = progress > 0.5;

  return (
    <div className={styles.fullContainer} ref={sceneRef}>
      <Header />

      {/* Description — fades out on scroll */}
      <div className={styles.descriptionContainer} style={{ opacity: descOpacity }}>
        <p>&quot;The best systems operate flawlessly in the dark.&quot;</p>
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

      {/* Title — fades out on scroll */}
      <div className={styles.titleContainer} style={{ opacity: titleOpacity }}>
        <h3>SHADOW</h3>
        <h1>ARCHITECT</h1>
      </div>

      {/* HUD Left Panel */}
      <div className={`${styles.hudLeft} ${showSecondHUD ? styles.active : ""}`}>
        <div className={styles.hudLeftFrame}>
          <div className={styles.hudLeftTitleContainer}>
            <h2 className={styles.hudLeftTitle}>SHADOW ARCHITECH</h2>
          </div>
          <p className={styles.hudLeftDescription}>
            I engineer from the abyss. While others seek the spotlight, I build
            high-performance digital ecosystems and scaling architectures entirely
            behind the scenes. Complex codebases are just dungeons to clear.
            Let&apos;s build flawlessly in the dark.
          </p>
          <div className={styles.hudLeftMetaContainer}>
            <div className={styles.hudLeftMetaItem}>
              <svg className={styles.hudGemIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,15 80,38 80,62 50,85 20,62 20,38" fill="url(#gemGradLeft1)" stroke="#d10101" strokeWidth="2"/>
                <polygon points="50,15 50,85" stroke="#ff4d4d" strokeWidth="1" opacity="0.6"/>
                <polygon points="20,38 80,38" stroke="#ff4d4d" strokeWidth="1" opacity="0.6"/>
                <polygon points="20,62 80,62" stroke="#ff4d4d" strokeWidth="1" opacity="0.6"/>
                <polygon points="50,15 20,38 50,38" fill="#ff6666" opacity="0.25"/>
                <polygon points="50,15 80,38 50,38" fill="#ff1a1a" opacity="0.35"/>
                <polygon points="20,38 20,62 50,62" fill="#990000" opacity="0.25"/>
                <polygon points="80,38 80,62 50,62" fill="#d10101" opacity="0.45"/>
                <polygon points="20,62 50,85 50,62" fill="#660000" opacity="0.35"/>
                <polygon points="80,62 50,85 50,62" fill="#330000" opacity="0.55"/>
                <defs>
                  <radialGradient id="gemGradLeft1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff6666" />
                    <stop offset="70%" stopColor="#d10101" />
                    <stop offset="100%" stopColor="#330000" />
                  </radialGradient>
                </defs>
              </svg>
              <span>Faction: Web Development</span>
            </div>
            <div className={styles.hudLeftMetaItem}>
              <svg className={styles.hudGemIcon} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="50,15 80,38 80,62 50,85 20,62 20,38" fill="url(#gemGradLeft2)" stroke="#d10101" strokeWidth="2"/>
                <polygon points="50,15 50,85" stroke="#ff4d4d" strokeWidth="1" opacity="0.6"/>
                <polygon points="20,38 80,38" stroke="#ff4d4d" strokeWidth="1" opacity="0.6"/>
                <polygon points="20,62 80,62" stroke="#ff4d4d" strokeWidth="1" opacity="0.6"/>
                <polygon points="50,15 20,38 50,38" fill="#ff6666" opacity="0.25"/>
                <polygon points="50,15 80,38 50,38" fill="#ff1a1a" opacity="0.35"/>
                <polygon points="20,38 20,62 50,62" fill="#990000" opacity="0.25"/>
                <polygon points="80,38 80,62 50,62" fill="#d10101" opacity="0.45"/>
                <polygon points="20,62 50,85 50,62" fill="#660000" opacity="0.35"/>
                <polygon points="80,62 50,85 50,62" fill="#330000" opacity="0.55"/>
                <defs>
                  <radialGradient id="gemGradLeft2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#ff6666" />
                    <stop offset="70%" stopColor="#d10101" />
                    <stop offset="100%" stopColor="#330000" />
                  </radialGradient>
                </defs>
              </svg>
              <span>Type: Designer</span>
            </div>
          </div>
        </div>
      </div>

      {/* HUD Right Panel */}
      <div className={`${styles.hudRight} ${showSecondHUD ? styles.active : ""}`}>
        <div className={styles.playerPlate}>
          <div className={styles.statBarContainer}>
            <div className={styles.statBarFill} />
          </div>
          <div className={styles.playerNameContainer}>
            <span className={styles.playerName}>SHINJIN</span>
            <div className={styles.stripes}>
              <div className={styles.stripe} />
              <div className={styles.stripe} />
              <div className={styles.stripe} />
              <div className={styles.stripe} />
            </div>
          </div>
        </div>
      </div>

      {/* Explore Button */}
      <div className={`${styles.exploreButtonContainer} ${showSecondHUD ? styles.active : ""}`}>
        <Link href="/profile">
          <button className={styles.exploreButton}>EXPLORE</button>
        </Link>
      </div>
    </div>
  );
}
