import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Metadata } from "next";

const About = dynamic(() => import("@/components/About"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "About | Hitesh Kumar",
  description:
    "Hitesh Kumar is an AI/ML Engineer passionate about building intelligent systems and solving real-world challenges.",
};

export default function AboutPage() {
  return (
    <Container>
      <span className="text-4xl">💬</span>
      <Heading className="font-black">About Me</Heading>
      <Suspense fallback={<div>Loading...</div>}>
        <About />
      </Suspense>
    </Container>
  );
}