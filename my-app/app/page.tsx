"use client";

import { useEffect, useState } from "react";
import { searchSongs } from "@/lib/itunes";
import type { Song } from "@/lib/types";
import SearchInput from "@/components/search/SearchInput";
import SongGrid from "@/components/search/SongGrid";

export default function HomePage() {
  const [query, setQuery] = useState("adele");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

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
        console.error("Failed to fetch songs", error);
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <main>
      <h1>Melodia</h1>
      <h3>Browse Songs</h3>
      <SearchInput value={query} onChange={setQuery} />
      {loading ? <p>Loading...</p> : <SongGrid songs={songs} />}
    </main>
  );
}
