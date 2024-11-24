// app/types.ts
export interface MediaItem {
  name: string;
  url: string;
  imgix_url: string;
}

export interface MediaResponse {
  media: MediaItem[];
  total: number;
}
