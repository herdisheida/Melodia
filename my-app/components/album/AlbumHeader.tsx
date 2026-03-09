import type { Album, Song } from "@/lib/types";
import styles from "./AlbumHeader.module.css";

type AlbumHeaderProps = {
  album: Album;
  tracks: Song[];
};

function formatTotalDuration(tracks: Song[]) {
  const totalMs = tracks.reduce(
    (sum, track) => sum + (track.trackTimeMillis ?? 0),
    0,
  );
  const totalMinutes = Math.floor(totalMs / 1000 / 60);

  return `${tracks.length} song${tracks.length !== 1 ? "s" : ""}, ${totalMinutes} min`;
}

export default function AlbumHeader({ album, tracks }: AlbumHeaderProps) {
  return (
    <section className={styles.header}>
      <img
        src={album.artworkUrl100.replace("100x100bb", "300x300bb")} // get higher res image
        alt={album.collectionName}
        className={styles.cover}
      />

      <div className={styles.info}>
        <p className={styles.label}>Album</p>
        <h1 className={styles.title}>{album.collectionName}</h1>

        <div className={styles.meta}>
          <span className={styles.artist}>{album.artistName}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.genre}>{album.primaryGenreName}</span>
          <span className={styles.dot}>•</span>
          <span className={styles.duration}>{formatTotalDuration(tracks)}</span>
        </div>
      </div>
    </section>
  );
}
