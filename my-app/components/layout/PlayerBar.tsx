"use client";

import { usePlayer } from "@/context/PlayerContext";
import styles from "./PlayerBar.module.css";

export default function PlayerBar() {
  const { currentSong } = usePlayer();

  // TODO make sure it's not rerendering when changing pages

  return (
    <div className={styles.playerBar}>
      {currentSong ? (
        <div className={styles.songInfo}>
          <img
            className={styles.image}
            src={currentSong.artworkUrl100}
            alt={currentSong.trackName}
          />
          <div>
            <div className={styles.trackName}>{currentSong.trackName}</div>
            <div className={styles.artistName}>{currentSong.artistName}</div>
          </div>
        </div>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
}
