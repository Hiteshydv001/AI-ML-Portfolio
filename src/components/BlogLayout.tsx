"use client";
import Head from "next/head";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formatDate } from "../../lib/formatDate";
import { Prose } from "@/components/Prose";
import { Container } from "./Container";
import { Heading } from "./Heading";
import Link from "next/link";
import { Paragraph } from "./Paragraph";

function ArrowLeftIcon(props: any) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
      <path
        d="M7.25 11.25 3.75 8m0 0 3.5-3.25M3.75 8h8.5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type MetaType = {
  title: string;
  date: string;
  description: string;
  image: string;
  tags?: string[];
};

export function BlogLayout({
  children,
  meta,
  isRssFeed = false,
  previousPathname,
}: {
  children: React.ReactNode;
  meta: MetaType;
  isRssFeed?: boolean;
  previousPathname?: string;
}) {
  let router = useRouter();

  return (
    <Container>
      <article>
        <header className="flex flex-col">
          <Link
            type="button"
            href="/research"
            aria-label="Go back to research papers"
            className="group mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition  "
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 d" />
          </Link>

          <Heading className="py-4">{meta.title}</Heading>
          <time
            dateTime={meta.date}
            className="flex items-center text-base text-zinc-400"
          >
            <Paragraph className="text-zinc-700">
              {formatDate(meta.date)}
            </Paragraph>
          </time>
          <div className="relative w-full h-[600px] mt-4 rounded-lg overflow-hidden bg-gray-100">
            <Image
              src={meta.image}
              alt="thumbnail"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
          </div>
        </header>
        <Prose className="mt-8">{children}</Prose>
      </article>
    </Container>
  );
}
