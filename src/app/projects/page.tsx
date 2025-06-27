import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Products } from "@/components/Products";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Hitesh Kumar",
  description:
    "Explore a collection of AI, Machine Learning, and software development projects by Hitesh Kumar.",
};

export default function ProjectsPage() {
  return (
    <Container>
      <div className="flex items-center gap-4 mb-10">
        <span className="text-4xl">⚡</span>
        <Heading className="font-black">What I&apos;ve been working on</Heading>
      </div>

      <Products />
    </Container>
  );
}