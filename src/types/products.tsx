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

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  image: string;
  companyUrl: string;
  certificateUrl: string;
  frenchWebsiteUrl?: string;
  githubUrl?: string;
  deploymentUrl?: string;
  slug: string;
  content?: React.ReactNode;
}
