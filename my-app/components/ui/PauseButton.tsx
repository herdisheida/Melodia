import styles from "./Button.module.css";

export default function PauseButton() {
  return (
    <button className={styles.pauseBtn}>
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
      </svg>
    </button>
  );
}
