"use client";

import type { Song } from "@/lib/types";
import { usePlayer } from "@/context/PlayerContext";
import Link from "next/link";
import styles from "./SongCard.module.css";

export default function SongCard({ song }: { song: Song }) {
  const { setCurrentSong } = usePlayer();

  return (
    <div className={styles.card}>
      {/* album image -> goes to album page */}
      <Link href={`/album/${song.collectionId}`}>
        <img
          className={styles.image}
          src={song.artworkUrl100}
          alt={song.trackName}
        />
      </Link>

      <div key={song.trackId} className={styles.info}>
        <h3 className={styles.title}>{song.trackName}</h3>
        <p className={styles.artist}>{song.artistName}</p>

        {/* album name -> goes to album page */}
        <Link href={`/album/${song.collectionId}`} className={styles.albumLink}>
          {song.collectionName}
        </Link>
      </div>

      <button onClick={() => setCurrentSong(song)} className={styles.playBtn}>
        Play
      </button>
    </div>
  );
}
