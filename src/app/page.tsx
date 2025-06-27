import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { AIWorkstation } from "@/components/AIWorkstation";

export default function Home() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Container>
        {/* --- Hero Section: Your Personal Introduction --- */}
        <div className="flex flex-col justify-center pt-20">
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
        </div>

        {/* --- Live Simulation Section --- */}
        <div className="mt-16">
        <Paragraph className="text-center mb-4 text-lg mt-16">
          Ready to see how I build? <Highlight>Let&apos;s dive in.</Highlight>
        </Paragraph>
          <AIWorkstation />
        </div>

        

        {/* --- Projects and Tech Stack Section --- */}
        <div className="mt-24">
          <Heading
            as="h2"
            className="font-black text-lg md:text-lg lg:text-lg mb-4"
          >
            Pipeline Outputs: Featured Projects
          </Heading>
          <Products />
          <TechStack />
        </div>
      </Container>
    </div>
  );
}