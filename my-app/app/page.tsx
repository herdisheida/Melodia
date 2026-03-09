"use client";

import { useEffect, useState } from "react";
import { searchSongs } from "@/lib/itunes";
import type { Song } from "@/lib/types";
import SearchInput from "@/components/search/SearchInput";
import SongGrid from "@/components/search/SongGrid";

export default function HomePage() {
  const [query, setQuery] = useState("");
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
      {/* TODO make sure it doesn't reload when we go back to homepage after going to album etc */}
      <SearchInput value={query} onChange={setQuery} />
      {/* TODO: Implement loading spinner ? */}
      {loading ? <p>Loading...</p> : <SongGrid songs={songs} />}
    </main>
  );
}
