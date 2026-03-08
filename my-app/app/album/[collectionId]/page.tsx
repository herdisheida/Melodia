"use client";

import { useEffect, useState } from "react";
import { lookupAlbum } from "@/lib/itunes";
import type { Album, Song } from "@/lib/types";
import { useParams } from "next/navigation";

export default function AlbumPage() {
  const param = useParams() as { collectionId: string };

  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadAlbum() {
      try {
        setLoading(true);
        const data = await lookupAlbum(param.collectionId);
        setAlbum(data.album);
        setTracks(data.tracks);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadAlbum();
  }, [param.collectionId]);

  if (loading) return <p>Loading album...</p>;
  if (!album) return <p>Album not found.</p>;

  return (
    <main>
      {/* TODO add back buton */}
      {/* TODO fix this messs */}
      <img src={album.artworkUrl100} alt={album.collectionName} />
      <h1>{album.collectionName}</h1>
      <p>{album.artistName}</p>
      <p>{album.primaryGenreName}</p>

      <h2>Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.trackId}>
            {track.trackNumber}. {track.trackName}
          </li>
        ))}
      </ul>
    </main>
  );
}
