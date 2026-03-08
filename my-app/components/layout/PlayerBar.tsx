"use client";

import { usePlayer } from "@/context/PlayerContext";

export default function PlayerBar() {
  const { currentSong } = usePlayer();

  if (!currentSong) {
    return <div>No song selected</div>;
  }

  return (
    <div>
      <img src={currentSong.artworkUrl100} alt={currentSong.trackName} />
      <div>
        <p>{currentSong.trackName}</p>
        <p>{currentSong.artistName}</p>
      </div>
    </div>
  );
}
