"use client";

import { useEffect, useState } from "react";
import { searchSongs } from "@/lib/itunes";
import type { Song } from "@/lib/types";
import Link from "next/link";

export default function HomePage() {
  const [query, setQuery] = useState("adele");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  // TODO debounce or only search when user presses "enter"
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!query.trim()) {
        setSongs([]);
        return;
      }

      try {
        setLoading(true);
        const results = await searchSongs(query);
        setSongs(results);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main>
      <h1>Melodia</h1>

      <input
        type="text"
        value={query}
        placeholder="Search songs..."
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* TODO add loading spinner */}
      {loading && <p>Loading...</p>}

      {/* TODO fix ui on search song results*/}
      <div>
        {songs.map((song) => (
          <div key={song.trackId}>
            <Link href={`/album/${song.collectionId}`}>
              <img src={song.artworkUrl100} alt={song.trackName} />
            </Link>

            <h3>{song.trackName}</h3>
            <p>{song.artistName}</p>

            {/* <Link href={`/album/${song.collectionId}`}>
              {song.collectionName}
            </Link> */}
          </div>
        ))}
      </div>
    </main>
  );
}
