import type { Album, LookupResponse, SearchResponse, Song } from "./types";

const BASE_URL = "https://itunes.apple.com";

export async function searchSongs(query: string): Promise<Song[]> {
  if (!query.trim()) return [];

  const url = `${BASE_URL}/search?term=${encodeURIComponent(query)}&entity=song&limit=12`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch songs");
  }

  const data: SearchResponse = await response.json();
  return data.results;
}

export async function lookupAlbum(
  collectionId: string | number,
): Promise<{ album: Album | null; tracks: Song[] }> {
  const url = `${BASE_URL}/lookup?id=${collectionId}&entity=song`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch album details");
  }

  const data: LookupResponse = await response.json();

  const album =
    data.results.find((item) => item.wrapperType === "collection") ?? null; // null if not found

  const tracks = data.results.filter(
    (item) => item.wrapperType === "track",
  ) as Song[];

  return { album: album as Album | null, tracks };
}
