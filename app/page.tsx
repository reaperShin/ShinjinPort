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

      {/* Ambient Particles */}
      <div className={styles.particles} aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.particle} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>

      {/* Rotating Border Ring */}
      <div className={styles.borderRing} aria-hidden="true">
        <svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg" className={styles.borderRingSvg}>
          <defs>
            {/* Green orb — top */}
            <radialGradient id="orbG_top" cx="35%" cy="28%" r="65%" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#b8ffd0" />
              <stop offset="30%" stopColor="#0fd63a" />
              <stop offset="65%" stopColor="#026d26" />
              <stop offset="100%" stopColor="#001208" />
            </radialGradient>
            {/* Gold orb — bottom */}
            <radialGradient id="orbG_bottom" cx="35%" cy="28%" r="65%" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#fff5b0" />
              <stop offset="30%" stopColor="#f0b800" />
              <stop offset="65%" stopColor="#946808" />
              <stop offset="100%" stopColor="#261600" />
            </radialGradient>
            {/* Blue orb — left */}
            <radialGradient id="orbG_left" cx="35%" cy="28%" r="65%" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#c0d0ff" />
              <stop offset="30%" stopColor="#3a5aee" />
              <stop offset="65%" stopColor="#0f197a" />
              <stop offset="100%" stopColor="#02040f" />
            </radialGradient>
            {/* Red orb — right */}
            <radialGradient id="orbG_right" cx="35%" cy="28%" r="65%" gradientUnits="objectBoundingBox">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="20%" stopColor="#ffaaaa" />
              <stop offset="55%" stopColor="#d10101" />
              <stop offset="100%" stopColor="#3a0000" />
            </radialGradient>
          </defs>

          <circle cx="400" cy="400" r="380" fill="none" stroke="rgba(209,1,1,0.15)" strokeWidth="1" strokeDasharray="8 24" />
          <circle cx="400" cy="400" r="350" fill="none" stroke="rgba(209,1,1,0.08)" strokeWidth="1" strokeDasharray="4 40" />

          {/* ── Green orb (top, center 400,34) ── */}
          <g>
            <circle cx="400" cy="34" r="22" fill="#026d26" opacity="0.18" />
            <circle cx="400" cy="34" r="14" fill="#0fd63a" opacity="0.08" />
            {/* shadow base */}
            <polygon points="400,12 418,34 400,56 382,34" fill="#001208" opacity="0.7" />
            {/* main gradient face */}
            <polygon points="400,12 418,34 400,56 382,34" fill="url(#orbG_top)" />
            {/* upper-left highlight facet */}
            <polygon points="400,12 382,34 400,34" fill="#c8ffda" opacity="0.38" />
            {/* upper-right mid facet */}
            <polygon points="400,12 418,34 400,34" fill="#0fd63a" opacity="0.12" />
            {/* lower-right shadow facet */}
            <polygon points="418,34 400,56 400,34" fill="#001208" opacity="0.55" />
            {/* lower-left shadow facet */}
            <polygon points="382,34 400,56 400,34" fill="#001e0a" opacity="0.35" />
            {/* edge stroke */}
            <polygon points="400,12 418,34 400,56 382,34" fill="none" stroke="#4dff80" strokeWidth="0.6" opacity="0.6" />
            {/* specular */}
            <ellipse cx="392" cy="22" rx="3.5" ry="2.5" fill="white" opacity="0.55" />
            <circle cx="392" cy="21" r="1.2" fill="white" opacity="0.9" />
          </g>

          {/* ── Gold orb (bottom, center 400,766) ── */}
          <g>
            <circle cx="400" cy="766" r="22" fill="#946808" opacity="0.18" />
            <circle cx="400" cy="766" r="14" fill="#f0b800" opacity="0.08" />
            <polygon points="400,744 418,766 400,788 382,766" fill="#261600" opacity="0.7" />
            <polygon points="400,744 418,766 400,788 382,766" fill="url(#orbG_bottom)" />
            <polygon points="400,744 382,766 400,766" fill="#fff5c0" opacity="0.38" />
            <polygon points="400,744 418,766 400,766" fill="#f0b800" opacity="0.12" />
            <polygon points="418,766 400,788 400,766" fill="#261600" opacity="0.55" />
            <polygon points="382,766 400,788 400,766" fill="#1a1000" opacity="0.35" />
            <polygon points="400,744 418,766 400,788 382,766" fill="none" stroke="#ffd966" strokeWidth="0.6" opacity="0.6" />
            <ellipse cx="392" cy="754" rx="3.5" ry="2.5" fill="white" opacity="0.55" />
            <circle cx="392" cy="753" r="1.2" fill="white" opacity="0.9" />
          </g>

          {/* ── Blue orb (left, center 34,400) ── */}
          <g>
            <circle cx="34" cy="400" r="22" fill="#0f197a" opacity="0.18" />
            <circle cx="34" cy="400" r="14" fill="#3a5aee" opacity="0.08" />
            <polygon points="34,378 56,400 34,422 12,400" fill="#02040f" opacity="0.7" />
            <polygon points="34,378 56,400 34,422 12,400" fill="url(#orbG_left)" />
            <polygon points="34,378 12,400 34,400" fill="#d0dcff" opacity="0.38" />
            <polygon points="34,378 56,400 34,400" fill="#3a5aee" opacity="0.12" />
            <polygon points="56,400 34,422 34,400" fill="#02040f" opacity="0.55" />
            <polygon points="12,400 34,422 34,400" fill="#03071a" opacity="0.35" />
            <polygon points="34,378 56,400 34,422 12,400" fill="none" stroke="#6699ff" strokeWidth="0.6" opacity="0.6" />
            <ellipse cx="24" cy="390" rx="3.5" ry="2.5" fill="white" opacity="0.55" />
            <circle cx="24" cy="389" r="1.2" fill="white" opacity="0.9" />
          </g>

          {/* ── Red orb (right, center 766,400) ── */}
          <g>
            <circle cx="766" cy="400" r="22" fill="#d10101" opacity="0.18" />
            <circle cx="766" cy="400" r="14" fill="#ff5555" opacity="0.08" />
            <polygon points="766,378 788,400 766,422 744,400" fill="#3a0000" opacity="0.7" />
            <polygon points="766,378 788,400 766,422 744,400" fill="url(#orbG_right)" />
            <polygon points="766,378 744,400 766,400" fill="#ffe0e0" opacity="0.38" />
            <polygon points="766,378 788,400 766,400" fill="#ff5555" opacity="0.12" />
            <polygon points="788,400 766,422 766,400" fill="#3a0000" opacity="0.55" />
            <polygon points="744,400 766,422 766,400" fill="#220000" opacity="0.35" />
            <polygon points="766,378 788,400 766,422 744,400" fill="none" stroke="#ff8080" strokeWidth="0.6" opacity="0.6" />
            <ellipse cx="756" cy="390" rx="3.5" ry="2.5" fill="white" opacity="0.55" />
            <circle cx="756" cy="389" r="1.2" fill="white" opacity="0.9" />
          </g>

        </svg>
      </div>


      {/* HUD Left Panel */}
      <div className={`${styles.hudLeft} ${showSecondHUD ? styles.active : ""}`}>
        <div className={styles.hudLeftFrame}>
          {/* Decorative scan line */}
          <div className={styles.scanLine} />
          {/* Rotating corner ornament (top-right of left panel) */}
          <div className={styles.cornerOrnament} />
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
                <polygon points="50,15 80,38 80,62 50,85 20,62 20,38" fill="url(#gemGradLeft1)" stroke="#d10101" strokeWidth="2" />
                <polygon points="50,15 50,85" stroke="#ff4d4d" strokeWidth="1" opacity="0.6" />
                <polygon points="20,38 80,38" stroke="#ff4d4d" strokeWidth="1" opacity="0.6" />
                <polygon points="20,62 80,62" stroke="#ff4d4d" strokeWidth="1" opacity="0.6" />
                <polygon points="50,15 20,38 50,38" fill="#ff6666" opacity="0.25" />
                <polygon points="50,15 80,38 50,38" fill="#ff1a1a" opacity="0.35" />
                <polygon points="20,38 20,62 50,62" fill="#990000" opacity="0.25" />
                <polygon points="80,38 80,62 50,62" fill="#d10101" opacity="0.45" />
                <polygon points="20,62 50,85 50,62" fill="#660000" opacity="0.35" />
                <polygon points="80,62 50,85 50,62" fill="#330000" opacity="0.55" />
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
                <polygon points="50,15 80,38 80,62 50,85 20,62 20,38" fill="url(#gemGradLeft2)" stroke="#d10101" strokeWidth="2" />
                <polygon points="50,15 50,85" stroke="#ff4d4d" strokeWidth="1" opacity="0.6" />
                <polygon points="20,38 80,38" stroke="#ff4d4d" strokeWidth="1" opacity="0.6" />
                <polygon points="20,62 80,62" stroke="#ff4d4d" strokeWidth="1" opacity="0.6" />
                <polygon points="50,15 20,38 50,38" fill="#ff6666" opacity="0.25" />
                <polygon points="50,15 80,38 50,38" fill="#ff1a1a" opacity="0.35" />
                <polygon points="20,38 20,62 50,62" fill="#990000" opacity="0.25" />
                <polygon points="80,38 80,62 50,62" fill="#d10101" opacity="0.45" />
                <polygon points="20,62 50,85 50,62" fill="#660000" opacity="0.35" />
                <polygon points="80,62 50,85 50,62" fill="#330000" opacity="0.55" />
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
          {/* Rotating corner ornament */}
          <div className={styles.cornerOrnament} />
          {/* Scan line sweep */}
          <div className={styles.scanLine} />

          <div className={styles.playerNameRow}>
            <span className={styles.playerName}>SHINJIN</span>
            <span className={styles.playerLevel}>LV.99</span>
          </div>

          {/* Health Bar */}
          <div className={styles.statRow}>
            <span className={styles.statLabel}>HP</span>
            <div className={styles.statBarTrack}>
              <div className={`${styles.statBarFill} ${styles.healthFill}`} />
              <span className={styles.statValue}>9999 / 9999</span>
            </div>
          </div>

          {/* Mana Bar */}
          <div className={styles.statRow}>
            <span className={styles.statLabel}>MP</span>
            <div className={styles.statBarTrack}>
              <div className={`${styles.statBarFill} ${styles.manaFill}`} />
              <span className={styles.statValue}>891 / 999</span>
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
