import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { MacbookSVG } from "@/components/MacbookSVG";
import { Paragraph } from "@/components/Paragraph";
import { Prose } from "@/components/Prose";
import { volunteerWork } from "@/constants/volunteer";
import { VolunteerWork } from "@/types/volunteer";
import { IconArrowLeft } from "@tabler/icons-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const work = volunteerWork.find((p) => p.slug === slug) as VolunteerWork | undefined;

  if (work) {
    return {
      title: `${work.organization} | Volunteer Work`,
      description: work.description.join(" "),
    };
  } else {
    return {
      title: "Volunteer Work | Portfolio",
      description: "My volunteer work and contributions.",
    };
  }
}

export default function SingleVolunteerPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const work = volunteerWork.find((p) => p.slug === slug);

  if (!work) {
    redirect("/volunteer");
  }

  return (
    <Container>
      {/* Back Button */}
      <Link
        href="/volunteer"
        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:ring-zinc-900/10"
      >
        <IconArrowLeft className="h-5 w-5 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
      </Link>

      {/* Main Image */}
      <div className="my-8">
        {work.thumbnail ? (
          <MacbookSVG src={work.thumbnail} className="drop-shadow-xl" />
        ) : (
          work.logo && (
            <div className="flex justify-center">
              <Image
                src={work.logo}
                alt={work.organization}
                width={200}
                height={200}
                className="rounded-lg shadow-lg"
              />
            </div>
          )
        )}
      </div>

      {/* Header with Title and Certificate Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <Heading className="font-black mb-2">{work.organization}</Heading>
          <p className="text-gray-600 dark:text-gray-400">
            {work.role} | {work.duration} | {work.location}
          </p>
        </div>
        {work.certificate && (
          <a
            href={work.certificate}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-4 py-2 origin-left whitespace-nowrap"
          >
            View Certificate
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
        )}
      </div>

      {/* Skills Tags */}
      <div className="flex flex-wrap gap-2 mb-8">
        {work.skills?.map((skill: string) => (
          <span
            key={skill}
            className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded-full font-medium border border-blue-100 dark:border-blue-800"
          >
            {skill}
          </span>
        ))}
      </div>

      {/* Description and Impact */}
      <div className="space-y-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Description</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            {work.description.map((desc, idx) => (
              <li key={idx}>{desc}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Impact</h3>
          <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
            {work.impact.map((impact, idx) => (
              <li key={idx}>{impact}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Additional Content */}
      {work.content && <Prose>{work.content}</Prose>}
    </Container>
  );
} 