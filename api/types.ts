export type SortOptions = "keep" | "delete";

export interface ApiUser {
  profilePicture: string;
  id: number;
}

export interface ApiCount {
  counts: {
    numMarkDelete: number;
    numMarkKeep: number;
    numMarkDeleteLaterDeleted: number;
    numMarkKeepLaterDeleted: number;
  };
}

export interface ApiAlbums {
  albums: {
    id: number;
    userId: number;
    created_at: Date | null;
    title: string;
    firstImage: ApiImage | null;
    keepCount: number;
    deleteCount: number;
  }[];
}

export interface ApiSingleAlbum {
  title: string;
  images: ApiImage[];
}

export interface ApiLoginLink {
  loginLink: string;
}

export type ApiImageUrls = ApiImage[];

export interface ApiImage {
  baseUrl: string;
  productUrl: string;
  id: number;
  sorted_album_id?: number;
  sorted_status: SortOptions;
  updated_at: Date;
  size: string | null;
}

export interface ApiSortImage {
  image: ApiImage[];
}
