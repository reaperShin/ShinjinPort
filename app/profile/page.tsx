"use client";

import Hero from "../../profile/webpages/about"
import styles from "@/profile/styles/about.module.css"

export default function Profile() {
    return (
        <div className={styles.profilePage}>
            <div className={styles.pageContainer}>
                <Hero />
            </div>
        </div>
    )
}