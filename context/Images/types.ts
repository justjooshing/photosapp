export interface IImage {
  source: string;
  id: number;
  width: number;
  height: number;
}

export interface IImageUrls {
  imageUrls: IImage[];
}
