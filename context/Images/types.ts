export interface IImage {
  baseUrl: string;
  productUrl: string;
  id: number;
  width: number;
  height: number;
  deleted_album_id?: number;
}

export type SortOptions = "keep" | "delete";
