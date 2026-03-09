"use client";

import type { Song } from "@/lib/types";
import { usePlayer } from "@/context/PlayerContext";
import Link from "next/link";
import styles from "./SongCard.module.css";

const MAX_TITLE_CHARS = 23; //

export default function SongCard({ song }: { song: Song }) {
  const { playSong } = usePlayer();

  // album name: up to XX characters -> if longer do '...' */
  const albumName =
    song.collectionName.substring(0, MAX_TITLE_CHARS) +
    (song.collectionName.length > MAX_TITLE_CHARS ? "..." : "");

  // song title: up to XX characters -> if longer do '...' */
  const songTitle =
    song.trackName.substring(0, MAX_TITLE_CHARS) +
    (song.trackName.length > MAX_TITLE_CHARS ? "..." : "");

  // artist name: up to XX characters -> if longer do '...' */
  const artistName =
    song.artistName.substring(0, MAX_TITLE_CHARS) +
    (song.artistName.length > MAX_TITLE_CHARS ? "..." : "");

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link href={`/album/${song.collectionId}`}>
          <img
            className={styles.image}
            src={song.artworkUrl100}
            alt={song.trackName}
          />
        </Link>

        <button onClick={() => playSong(song)} className={styles.playBtn}>
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path fill="black" d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <div key={song.trackId} className={styles.info}>
        <h3 className={styles.title}>{songTitle}</h3>
        <p className={styles.artist}>{artistName}</p>

        <Link href={`/album/${song.collectionId}`} className={styles.albumLink}>
          {albumName}
        </Link>
      </div>
    </div>
  );
}
