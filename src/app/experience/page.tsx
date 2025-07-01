import Experience from "@/components/Experience";
import { Container } from "@/components/Container";
import { Suspense } from "react";

export const metadata = {
  title: "Experience | Hitesh Kumar",
  description: "My professional experience and work history.",
};

export default function ExperiencePage() {
  return (
    <Container>
      <div className="flex flex-col gap-16 md:gap-24">
        <div className="flex flex-col gap-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Experience
            </h1>
            <p className="mt-4 text-base text-zinc-600 dark:text-zinc-400">
              A timeline of my professional journey and key achievements.
            </p>
          </div>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Experience />
        </Suspense>
      </div>
    </Container>
  );
} 