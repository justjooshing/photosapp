export type SortOptions = "keep" | "delete";

export interface ApiUser {
  profilePicture: string;
  id: number;
}

export interface ApiCount {
  counts: {
    sortedCount: number;
    deletedCount: number;
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

export interface ApiImageUrls {
  imageUrls: ApiImage[];
}

export interface ApiImage {
  baseUrl: string;
  productUrl: string;
  id: number;
  sorted_album_id?: number;
  sorted_status: SortOptions;
  updated_at: Date;
}

export interface ApiSortImage {
  image: ApiImage[];
}
