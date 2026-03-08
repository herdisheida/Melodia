"use client";

import { usePlayer } from "@/context/PlayerContext";
import styles from "./PlayerBar.module.css";

export default function PlayerBar() {
  const { currentSong } = usePlayer();

  return (
    <div className={styles.bar}>
      {currentSong ? (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={currentSong.artworkUrl100}
            alt={currentSong.trackName}
            width={60}
            height={60}
          />
          <div>
            <div>{currentSong.trackName}</div>
            <div>{currentSong.artistName}</div>
          </div>
        </div>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
}
