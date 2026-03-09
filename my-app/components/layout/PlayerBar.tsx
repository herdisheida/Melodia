"use client";

import Link from "next/link";
import { usePlayer } from "@/context/PlayerContext";
import PlayButton from "@/components/ui/PlayButton";
import PauseButton from "@/components/ui/PauseButton";
import styles from "./PlayerBar.module.css";

export default function PlayerBar() {
  const { currentSong, isPlaying, togglePlay } = usePlayer();

  return (
    <div className={styles.playerBar}>
      {currentSong ? (
        <>
          <div className={styles.songInfo}>
            <Link href={`/album/${currentSong.collectionId}`}>
              <img
                className={styles.image}
                src={currentSong.artworkUrl100}
                alt={currentSong.trackName}
              />
            </Link>
            {/* <img
              className={styles.image}
              src={currentSong.artworkUrl100}
              alt={currentSong.trackName}
            /> */}
            <div>
              <div className={styles.trackName}>{currentSong.trackName}</div>
              <div className={styles.artistName}>{currentSong.artistName}</div>
            </div>
          </div>
          <div className={styles.controls} onClick={togglePlay}>
            {isPlaying ? <PauseButton /> : <PlayButton />}
          </div>
        </>
      ) : (
        <p>No song selected</p>
      )}
    </div>
  );
}
