type WrapperType = "track" | "collection";
// type SongKind = "song";
// type CollectionType = "Album";

export interface Song {
  wrapperType: WrapperType;
  kind: "song";
  trackId: number;
  trackName: string;
  artistName: string;
  collectionId: number;
  collectionName: string;
  artworkUrl100: string;
  previewUrl?: string;
  trackNumber?: number;
  primaryGenreName?: string;
}

export interface Album {
  wrapperType: "collection";
  collectionType: "Album";
  collectionId: number;
  collectionName: string;
  artistName: string;
  artworkUrl100: string;
  primaryGenreName: string;
  trackCount: number;
}

export type SearchResponse = {
  resultCount: number;
  results: Song[];
};

export type LookupItem = Song | Album;

export type LookupResponse = {
  resultCount: number;
  results: LookupItem[];
};
