import Link from "next/link";
import styles from "./Sidebar.module.css";

export default function Sidebar() {
  return (
    <nav className={styles.sidebar}>
      <div className={styles.links}>
        <Link href="/">Home</Link>
        <Link href="/favorites">Favorites</Link>
      </div>
    </nav>
  );
}
