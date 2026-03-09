"use client";

import { usePlayer } from "@/context/PlayerContext";
import type { Song } from "@/lib/types";
import styles from "./TrackList.module.css";

type TrackListProps = {
  tracks: Song[];
};

function formatDuration(ms?: number) {
  if (!ms) return "--:--";

  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function TrackList({ tracks }: TrackListProps) {
  const { playSong } = usePlayer();

  return (
    <section className={styles.section}>
      <div className={styles.headingRow}>
        <span>#</span>
        <span>Title</span>
        <span className={styles.timeHeading}>Time</span>
      </div>

      <div className={styles.list}>
        {tracks.map((track, index) => (
          <button
            key={track.trackId}
            className={styles.row}
            onClick={() => playSong(track)}
            type="button"
          >
            <span className={styles.number}>
              {track.trackNumber ?? index + 1}
            </span>

            <div className={styles.trackInfo}>
              <span className={styles.trackName}>{track.trackName}</span>
              <span className={styles.artistName}>{track.artistName}</span>
            </div>

            <span className={styles.duration}>
              {formatDuration(track.trackTimeMillis)}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
