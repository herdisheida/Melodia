import type { Song } from "@/lib/types";
import SongCard from "@/components/search/SongCard";
import styles from "./SongGrid.module.css";

export default function SongGrid({ songs }: { songs: Song[] }) {
  return (
    <div className={styles.grid}>
      {songs.map((song) => (
        <SongCard key={song.trackId} song={song} />
      ))}
    </div>
  );
}
