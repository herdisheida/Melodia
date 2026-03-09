import type { Album, LookupResponse, SearchResponse, Song } from "./types";

export async function searchSongs(query: string): Promise<Song[]> {
  if (!query.trim()) return [];

  const response = await fetch(`/api/search?term=${encodeURIComponent(query)}`);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  const data: SearchResponse = await response.json();
  return data.results;
}

export async function lookupAlbum(
  collectionId: string | number,
): Promise<{ album: Album | null; tracks: Song[] }> {
  if (!collectionId) {
    throw new Error("Collection ID is required");
  }

  const url = `/api/album/${collectionId}`; // folder url

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch album details");
  }

  const data: LookupResponse = await response.json();

  // no album found
  if (!data.results || data.results.length === 0) {
    return { album: null, tracks: [] };
  }

  const album =
    data.results.find((item) => item.wrapperType === "collection") ?? null;

  const tracks = data.results.filter(
    (item) => item.wrapperType === "track",
  ) as Song[];

  return { album: album as Album | null, tracks };
}
