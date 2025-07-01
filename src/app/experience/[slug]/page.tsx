import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { MacbookSVG } from "@/components/MacbookSVG";
import { Paragraph } from "@/components/Paragraph";
import { Prose } from "@/components/Prose";
import { experiences } from "@/constants/experiences";
import { IconArrowLeft } from "@tabler/icons-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const experience = experiences.find((e) => e.slug === slug);

  if (experience) {
    const description = Array.isArray(experience.description)
      ? experience.description[0]
      : experience.description;
    return {
      title: `${experience.title} at ${experience.company} | Hitesh Kumar`,
      description: description,
    };
  } else {
    return {
      title: "Experience | Hitesh Kumar",
      description: "My professional journey and work experience.",
    };
  }
}

export default function SingleExperiencePage({
  params,
}: {
  params: { slug:string };
}) {
  const slug = params.slug;
  const experience = experiences.find((e) => e.slug === slug);

  if (!experience) {
    redirect("/experience");
  }

  return (
    <Container>
      {/* Back Button */}
      <Link
        href="/experience"
        className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition hover:ring-zinc-900/10"
      >
        <IconArrowLeft className="h-5 w-5 stroke-zinc-500 transition group-hover:stroke-zinc-700" />
      </Link>

      {/* Main Experience Image */}
      <div className="my-8">
        <MacbookSVG src={experience.image || "/images/placeholder.png"} className="drop-shadow-xl" />
      </div>

      {/* Header with Title and Company Button */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <Heading className="font-black mb-0 pb-0">{experience.title}</Heading>
          <p className="text-zinc-600 dark:text-zinc-400">
            {experience.company} • {experience.period}
          </p>
        </div>
        
        {experience.companyUrl && (
          <a
            href={experience.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-lg shadow-black/20 sm:backdrop-blur-sm group-hover/button:bg-gray-50/15 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-sm font-medium px-4 py-2 origin-left whitespace-nowrap"
          >
            Visit Company
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

      {/* Tech Stack Tags */}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {experience.technologies.map((tech: string) => (
            <span
              key={tech}
              className="px-2.5 py-1 bg-sky-50 text-sky-600 text-xs rounded-full font-medium"
            >
              {tech}
            </span>
          ))}
        </div>
      )}

      {/* Description */}
      <div className="prose prose-zinc dark:prose-invert">
        {Array.isArray(experience.description) ? (
          experience.description.map((desc: string, index: number) => <p key={index}>{desc}</p>)
        ) : (
          <p>{experience.description}</p>
        )}
        
        {/* Additional Content */}
        {experience.content && (
          <Prose>{experience.content}</Prose>
        )}

        {/* Certificate Section */}
        {experience.certificateUrl && (
          <div className="mt-8">
            <h3>Certificate</h3>
            <p>
              <a
                href={experience.certificateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300"
              >
                View Certificate →
              </a>
            </p>
          </div>
        )}
      </div>
    </Container>
  );
}