import styles from "@/components/styles/header.module.css"

export default function Header() {
    return (
        <nav className={styles.headerContainer}>
            <h1>SHINJINMJ</h1>
            <ul className={styles.navLinks}>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="#">Profile</a>
                </li>
                <li>
                    <a href="https://github.com/reaperShin">Collab</a>
                </li>
            </ul>
        </nav>
    )
}