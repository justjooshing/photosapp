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
