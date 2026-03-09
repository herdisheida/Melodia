// currentSong + setCurrentSong
"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { Song } from "@/lib/types";

type PlayerContextType = {
  // selecting a song to play
  currentSong: Song | null;
  setCurrentSong: (song: Song | null) => void;

  isPlaying: boolean;
  playSong: (song?: Song) => void;
  pauseSong: () => void;
  togglePlay: () => void;
};

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [currentSong, setCurrentSongState] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function setCurrentSong(song: Song | null) {
    setCurrentSongState(song);
    setIsPlaying(!!song);
  }

  function playSong(song?: Song) {
    if (song) {
      setCurrentSongState(song);
    }

    if (song || currentSong) {
      setIsPlaying(true);
    }
  }

  const pauseSong = () => {
    setIsPlaying(false);
  };

  const togglePlay = () => {
    if (!currentSong) return;
    setIsPlaying((prev) => !prev);
  };

  const value = useMemo(
    () => ({
      currentSong,
      isPlaying,
      setCurrentSong,
      playSong,
      pauseSong,
      togglePlay,
    }),
    [currentSong, isPlaying],
  );

  return (
    <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(PlayerContext);

  if (!context) {
    throw new Error("usePlayer must be used inside a PlayerProvider");
  }

  return context;
}
