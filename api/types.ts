import { IImage } from "@/context/Images/types";

export type ImagesType = "today" | "similar";

export interface ApiUser {
  profilePicture: string;
  id: number;
}

export interface ApiCount {
  sortedCount: number;
  deletedCount: number;
}

export interface ApiAlbums {
  albums: {
    id: number;
    userId: number;
    created_at: Date | null;
    title: string;
    firstImage: IImage | null;
  }[];
}

export interface ApiSingleAlbum {
  title: string;
  images: IImage[];
}

export interface ApiLoginLink {
  loginLink: string;
}

export interface ApiImageUrls {
  imageUrls: IImage[];
}
