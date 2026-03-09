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

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return { album: null, tracks: [] };
    }

    const data: LookupResponse = await response.json();

    const album =
      data.results.find((item) => item.wrapperType === "collection") ?? null;

    const tracks = data.results.filter(
      (item) => item.wrapperType === "track",
    ) as Song[];

    return { album: album as Album | null, tracks };
  } catch (error) {
    console.error("lookupAlbum error:", error);
    return { album: null, tracks: [] };
  }
}
