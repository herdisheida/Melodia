import styles from "./Button.module.css";

export default function PauseButton() {
  return (
    <button className={styles.playBtn}>
      <svg viewBox="0 0 24 24" width="30" height="30">
        <path fill="black" d="M8 5v14l11-7z" />
      </svg>
    </button>
  );
}
