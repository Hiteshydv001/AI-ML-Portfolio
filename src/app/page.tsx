import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="relative">
        {/* Hero Section */}
        <Container className="min-h-[30vh] flex flex-col justify-center">
          <span className="text-4xl">👋</span>
          <Heading className="font-black">
            Hello there! I&apos;m Hitesh Kumar
          </Heading>
          <Paragraph className="max-w-xl mt-3">
            I&apos;m an AI/ML Engineer passionate about{" "}
            <Highlight>building intelligent systems</Highlight> that solve
            real-world challenges through automation and data-driven insights.
          </Paragraph>
          <Paragraph className="max-w-xl mt-3">
            My expertise lies in <Highlight>Generative AI and MLOps</Highlight>,
            where I enjoy designing multi-agent systems and deploying scalable AI
            solutions.
          </Paragraph>
        </Container>

        {/* Projects and Tech Stack */}
        <Container>
          <Heading
            as="h2"
            className="font-black text-lg md:text-lg lg:text-lg mt-8 mb-4"
          >
            What I&apos;ve been working on
          </Heading>
          <Products />
          <TechStack />
        </Container>
      </div>
    </div>
  );
}