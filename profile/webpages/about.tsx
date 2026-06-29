"use client";

import styles from "@/profile/styles/about.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import Me from "../assets/Me.png";
import Header from "@/components/header";

export default function Hero() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    // Trigger animations on mount
    const timer = setTimeout(() => setActive(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.heroContainer} ${active ? styles.active : ""}`}>
      {/* Left Column - Character Portrait HUD */}
      <div className={styles.leftSide}>
        <Header />
        <div className={styles.portraitWrapper}>
          {/* Rotating Target Reticles */}
          <div className={styles.hudRingOuter} />
          <div className={styles.hudRingInner} />

          {/* Vertical Scanner Line */}
          <div className={styles.hudScannerLine} />

          {/* Profile Picture */}
          <div className={styles.profilePicContainer}>
            <Image src={Me} alt="Shinjin" priority />
          </div>

          {/* Level & Class Badge */}
          <div className={styles.levelBadge}>LV. 99 DEVELOPER</div>
        </div>
      </div>

      {/* Right Column - Status Panel HUD */}
      <div className={styles.rightSide}>

        {/* About Me Info Block */}
        <div className={styles.description}>
          <h2 className={styles.sectionTitle}>ABOUT ME</h2>
          <div className={styles.descriptionFrame}>
            <p>
              Highly motivated Computer Science graduate from Taguig City University
              with full-stack development experience using React, Next.js, and Python.
              Proven track record of designing and engineering web-based internal
              systems during an intensive technical internship at ANTECH Inc.
              Passionate about combining complex backend logic with clean,
              minimalist UI/UX design to build impactful digital solutions.
            </p>
          </div>
        </div>

        {/* Software Inventory Block */}
        <div className={styles.skills}>
          <h2 className={styles.sectionTitle}>EQUIPPED SOFTWARE</h2>
          <div className={styles.softwareGrid}>

            {/* Slot 1: GitHub */}
            <div className={styles.softwareSlot}>
              <div className={styles.slotBox}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
              </div>
              <span className={styles.slotLabel}>Github</span>

              {/* Tooltip */}
              <div className={styles.itemTooltip}>
                <div className={styles.tooltipTitle}>GitHub</div>
                <div className={styles.tooltipRarity}>Legendary Relic</div>
                <div>Vault of codebases. Speeds up collaborations by +100%.</div>
              </div>
            </div>

            {/* Slot 2: NodeJS */}
            <div className={styles.softwareSlot}>
              <div className={styles.slotBox}>
                <svg viewBox="0 0 256 284" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M128.006 0L19.467 62.671V188.012L128.006 250.683L236.545 188.012V62.671L128.006 0Z" fill="#339933" />
                  <path d="M128.006 250.683V125.342L236.545 62.671V188.012L128.006 250.683Z" fill="#66cc33" />
                  <path d="M128.006 125.342L19.467 62.671L128.006 0V125.342Z" fill="#47a248" />
                </svg>
              </div>
              <span className={styles.slotLabel}>NodeJS</span>

              {/* Tooltip */}
              <div className={styles.itemTooltip}>
                <div className={styles.tooltipTitle}>NodeJS</div>
                <div className={styles.tooltipRarity}>Epic Core</div>
                <div>Asynchronous engine. Boosts backend throughput by +85%.</div>
              </div>
            </div>

            {/* Slot 3: NextJS */}
            <div className={styles.softwareSlot}>
              <div className={styles.slotBox}>
                <svg viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="90" cy="90" r="90" fill="black" />
                  <path d="M149.508 157.52L85.781 74.9224V128.125H72.8516V51.875H85.781L136.578 117.578V51.875H149.508V157.52Z" fill="white" />
                  <path d="M115.195 107.031L124.922 119.531H125.781V51.875H115.195V107.031Z" fill="white" />
                </svg>
              </div>
              <span className={styles.slotLabel}>NextJS</span>

              {/* Tooltip */}
              <div className={styles.itemTooltip}>
                <div className={styles.tooltipTitle}>NextJS</div>
                <div className={styles.tooltipRarity}>Legendary Frame</div>
                <div>React framework. Grants infinite SEO and SSR capability.</div>
              </div>
            </div>

            {/* Slot 4: Canva */}
            <div className={styles.softwareSlot}>
              <div className={styles.slotBox}>
                <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="256" cy="256" r="256" fill="url(#canvaGrad)" />
                  <path d="M260.6 156.4c-22.3 0-41.2 8-54.8 23.4-12.8 14.5-19.1 34.6-19.1 57.7 0 24.1 6.5 44.5 19.3 58.7 13.5 14.9 32.2 22.8 54.6 22.8 19.3 0 35.8-6.1 48-17.8 11.2-10.7 18.2-25.9 20.3-43.5h-25.6c-1.8 10-6.1 18.3-12.7 24.6-8 7.6-18.7 11.5-30.8 11.5-27.9 0-44.8-19.7-44.8-54.7 0-33.8 16.5-54.1 43.6-54.1 12.3 0 22.9 4.3 30.6 12.4 6.8 7.2 11 16.9 12.6 28h25.8c-1.9-19-9.1-35.3-20.9-46.7-12-11.5-28.7-17.3-48.2-17.3z" fill="white" />
                  <defs>
                    <linearGradient id="canvaGrad" x1="0" y1="0" x2="512" y2="512">
                      <stop offset="0%" stopColor="#00c4cc" />
                      <stop offset="100%" stopColor="#7d2ae8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className={styles.slotLabel}>Canva</span>

              {/* Tooltip */}
              <div className={styles.itemTooltip}>
                <div className={styles.tooltipTitle}>Canva</div>
                <div className={styles.tooltipRarity}>Rare Accessory</div>
                <div>Graphic artifact. Buffs UI layout mockup design by +40%.</div>
              </div>
            </div>

            {/* Slot 5: Lightroom */}
            <div className={styles.softwareSlot}>
              <div className={styles.slotBox}>
                <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="512" height="512" rx="64" fill="#011e30" stroke="#00c8ff" strokeWidth="20" />
                  <text x="75" y="325" fill="#00c8ff" fontSize="220" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold">L</text>
                  <text x="210" y="380" fill="#00c8ff" fontSize="170" fontFamily="Arial, Helvetica, sans-serif" fontWeight="bold">r</text>
                </svg>
              </div>
              <span className={styles.slotLabel}>Lightroom</span>

              {/* Tooltip */}
              <div className={styles.itemTooltip}>
                <div className={styles.tooltipTitle}>Lightroom</div>
                <div className={styles.tooltipRarity}>Rare Accessory</div>
                <div>Illumination editor. Enhances visual assets by +50%.</div>
              </div>
            </div>

            {/* Slot 6: Figma */}
            <div className={styles.softwareSlot}>
              <div className={styles.slotBox}>
                <svg viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M25 25C25 11.2 36.2 0 50 0C63.8 0 75 11.2 75 25V50H50H25V25Z" fill="#F24E1E" />
                  <path d="M75 25C75 38.8 63.8 50 50 50C36.2 50 25 38.8 25 25" fill="#FF7262" />
                  <path d="M25 75C25 61.2 36.2 50 50 50C63.8 50 75 61.2 75 75C75 88.8 63.8 100 50 100C36.2 100 25 88.8 25 75Z" fill="#A259FF" />
                  <path d="M25 125C25 111.2 36.2 100 50 100H75V125C75 138.8 63.8 150 50 150C36.2 150 25 138.8 25 125Z" fill="#1ABC9C" />
                  <path d="M75 75C75 61.2 63.8 50 50 50V75H75Z" fill="#19B5FE" />
                </svg>
              </div>
              <span className={styles.slotLabel}>Figma</span>

              {/* Tooltip */}
              <div className={styles.itemTooltip}>
                <div className={styles.tooltipTitle}>Figma</div>
                <div className={styles.tooltipRarity}>Epic Catalyst</div>
                <div>Prototyping canvas. Increases design precision by +75%.</div>
              </div>
            </div>

          </div>
        </div>

        {/* Character Skills Block - RPG Stat Bars */}
        <div className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>CHARACTER SKILLS</h2>
          <div className={styles.statsContainer}>

            {/* Skill 1: Adaptability */}
            <div className={styles.statRow}>
              <div className={styles.statHeader}>
                <span>Adaptability</span>
                <span className={styles.statLevel}>LV. 95</span>
              </div>
              <div className={styles.statBarOuter}>
                <div
                  className={styles.statBarInner}
                  style={{ width: active ? "95%" : "0%" }}
                />
              </div>
            </div>

            {/* Skill 2: Analytical */}
            <div className={styles.statRow}>
              <div className={styles.statHeader}>
                <span>Analytical Thinking</span>
                <span className={styles.statLevel}>LV. 92</span>
              </div>
              <div className={styles.statBarOuter}>
                <div
                  className={styles.statBarInner}
                  style={{ width: active ? "92%" : "0%" }}
                />
              </div>
            </div>

            {/* Skill 3: Collaborative */}
            <div className={styles.statRow}>
              <div className={styles.statHeader}>
                <span>Collaboration</span>
                <span className={styles.statLevel}>LV. 90</span>
              </div>
              <div className={styles.statBarOuter}>
                <div
                  className={styles.statBarInner}
                  style={{ width: active ? "90%" : "0%" }}
                />
              </div>
            </div>

            {/* Skill 4: Goal-Oriented */}
            <div className={styles.statRow}>
              <div className={styles.statHeader}>
                <span>Goal Orientation</span>
                <span className={styles.statLevel}>LV. 94</span>
              </div>
              <div className={styles.statBarOuter}>
                <div
                  className={styles.statBarInner}
                  style={{ width: active ? "94%" : "0%" }}
                />
              </div>
            </div>

            {/* Skill 5: Introspective */}
            <div className={styles.statRow}>
              <div className={styles.statHeader}>
                <span>Introspection</span>
                <span className={styles.statLevel}>LV. 88</span>
              </div>
              <div className={styles.statBarOuter}>
                <div
                  className={styles.statBarInner}
                  style={{ width: active ? "88%" : "0%" }}
                />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}