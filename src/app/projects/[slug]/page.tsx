import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { MacbookSVG } from "@/components/MacbookSVG";
import { Paragraph } from "@/components/Paragraph";
import { Prose } from "@/components/Prose";
import { products } from "@/constants/products";
import { Product } from "@/types/products";
import { IconArrowLeft } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug) as Product | undefined;

  if (product) {
    return {
      title: `${product.title} | Hitesh Kumar`,
      description: product.description,
    };
  } else {
    // Fallback metadata if product not found
    return {
      title: "Projects | Hitesh Kumar",
      description:
        "A collection of AI, Machine Learning, and software development projects by Hitesh Kumar.",
    };
  }
}

export default function SingleProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const product = products.find((p) => p.slug === slug);

  // If no product matches the slug, redirect to the main projects page
  if (!product) {
    redirect("/projects");
  }

  return (
    <Container>
      {/* Back Button */}
      <Link
        href="/projects"
        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:ring-zinc-900/10"
      >
        <IconArrowLeft className="h-5 w-5 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
      </Link>

      {/* Main Project Image using the SVG component */}
      <div className="my-8">
        <MacbookSVG src={product.thumbnail} className="drop-shadow-xl" />
      </div>

      {/* Header with Title and Live Preview Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <Heading className="font-black mb-0 pb-0"> {product.title}</Heading>
        <a
          href={product.href}
          target="__blank"
          className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-4 py-2 origin-left whitespace-nowrap"
        >
          Live Preview / GitHub
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 group-hover/button:translate-x-0.5 transition-transform"
          >
            <path d="M5 12l14 0"></path>
            <path d="M13 18l6 -6"></path>
            <path d="M13 6l6 6"></path>
          </svg>
        </a>
      </div>

      {/* Tech Stack Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {product.stack?.map((stack: string) => (
          <span
            key={stack}
            className="px-2.5 py-1 bg-sky-50 text-sky-600 text-xs rounded-full font-medium"
          >
            {stack}
          </span>
        ))}
      </div>

      {/* Short and Long Description */}
      <Paragraph className="max-w-xl mb-8">{product.description}</Paragraph>
      <Prose>{product.content}</Prose>
    </Container>
  );
}