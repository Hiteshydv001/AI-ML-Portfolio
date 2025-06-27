import { StaticImageData } from "next/image";

export type Product = {
  title: string;
  description: string;
  thumbnail: string;
  images: string[];
  href: string;
  livePreviewUrl?: string;
  slug?: string;
  stack?: string[];
  content?: React.ReactNode | string;
};
