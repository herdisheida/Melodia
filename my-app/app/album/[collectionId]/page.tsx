"use client";

import { useEffect, useState } from "react";
import { lookupAlbum } from "@/lib/itunes";
import type { Album, Song } from "@/lib/types";
import { useParams } from "next/navigation";
import AlbumHeader from "@/components/album/AlbumHeader";
import TrackList from "@/components/album/TrackList";
import styles from "./AlbumPage.module.css";

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

  // TODO loading spinner display (same as in saerch) -- reuse loading component
  if (loading) return <p>Loading album...</p>;
  if (!album) return <p>Album not found.</p>;

  return (
    <main className={styles.page}>
      <AlbumHeader album={album} tracks={tracks} />
      <TrackList tracks={tracks} />
    </main>
  );
}
// TODO (10%) Display the Album Header (Art, Artist, Genre) and a list of all tracks in the album.

// <main className={styles.container}>
//   <div className={styles.albumHeader}>
//     <img
//       src={album.artworkUrl100}
//       alt={album.collectionName}
//       className={styles.image}
//     />
//     <h1 className={styles.title}>{album.collectionName}</h1>
//     <p className={styles.artistName}>{album.artistName}</p>
//     <p className={styles.genre}>{album.primaryGenreName}</p>
//   </div>

//   <div className={styles.tracks}>
//     <h2>Tracks</h2>
//     <ul>
//       {tracks.map((track) => (
//         <li key={track.trackId}>
//           {track.trackNumber}. {track.trackName}
//         </li>
//       ))}
//     </ul>
//   </div>
// </main>
