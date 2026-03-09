import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <h2>Melodia</h2>
      {/* TODO make the home and favourite page work */}
      <Link href="/">Home</Link>
      <Link href="/favorites">Favorites</Link>
    </nav>
  );
}
