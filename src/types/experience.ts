import { ReactNode } from 'react';

export interface Experience {
  title: string;
  company: string;
  location?: string;
  period?: string;
  description: string[] | string;
  technologies?: string[];
  image?: string;
  companyUrl?: string;
  certificateUrl?: string;
  additionalCertificateUrl?: string;
  frenchWebsiteUrl?: string;
  githubUrl?: string;
  deploymentUrl?: string;
  slug: string;
  content?: ReactNode;
} 