"use client";

import { useEffect, useState } from "react";
import { lookupAlbum } from "@/lib/itunes";
import type { Album, Song } from "@/lib/types";
import { useParams } from "next/navigation";
import AlbumHeader from "@/components/album/AlbumHeader";
import TrackList from "@/components/album/TrackList";
import styles from "./AlbumPage.module.css";
import Spinner from "@/components/ui/Spinner";

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

  if (loading) return <Spinner />;
  // TODO handle error state better
  if (!album) return <p>Album not found.</p>;

  return (
    <div className={styles.page}>
      <AlbumHeader album={album} tracks={tracks} />
      <TrackList tracks={tracks} />
    </div>
  );
}
