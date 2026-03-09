"use client";

import { usePlayer } from "@/context/PlayerContext";
import PlayButton from "@/components/ui/PlayButton";
import PauseButton from "@/components/ui/PauseButton";
import styles from "./PlayerBar.module.css";

export default function PlayerBar() {
  const { currentSong } = usePlayer();

  return (
    <div className={styles.playerBar}>
      {currentSong ? (
        <>
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
          <div className={styles.controls}>
            <PlayButton />
            <PauseButton />
          </div>
        </>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
}
