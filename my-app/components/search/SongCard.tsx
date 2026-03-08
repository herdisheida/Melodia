"use client";

import type { Song } from "@/lib/types";
import { usePlayer } from "@/context/PlayerContext";
import Link from "next/link";
import styles from "./SongCard.module.css";

export default function SongCard({ song }: { song: Song }) {
  const { setCurrentSong } = usePlayer();

  return (
    <div className={styles.card}>
      <div key={song.trackId} className={styles.info}>
        <Link href={`/album/${song.collectionId}`}>
          <img src={song.artworkUrl100} alt={song.trackName} />
        </Link>

        <h3>{song.trackName}</h3>
        <p>{song.artistName}</p>

        <Link href={`/album/${song.collectionId}`}>{song.collectionName}</Link>
      </div>

      <button onClick={() => setCurrentSong(song)} className={styles.playBtn}>
        Play
      </button>
    </div>
  );
}
