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
            <div className="flex items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-blue-600">
                <path fillRule="evenodd" d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
              </svg>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Experience
              </h1>
            </div>
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