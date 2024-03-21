export interface IImage {
  baseUrl: string;
  photoUrl: string;
  id: number;
  width: number;
  height: number;
}

export interface IImageUrls {
  imageUrls: IImage[];
}

export interface IAlbum {
  id: number;
  userId: number;
  created_at: Date | null;
  title: string;
  firstImage: {
    id: number;
    googleId: string;
    userId: number;
    created_at: Date;
    deleted_at: Date | null;
    sorted_at: Date | null;
    deleted_album_id: number | null;
    width: number;
    height: number;
  } | null;
}

export type Albums = IAlbum[];

export type SortOptions = "keep" | "delete";
