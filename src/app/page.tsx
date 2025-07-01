import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { Products } from "@/components/Products";
import { TechStack } from "@/components/TechStack";
import { ChatInterface } from "@/components/ChatInterface";
import { AIWorkstation } from "@/components/AIWorkstation";

export default function Home() {
  return (
    <div className="relative">
      <Container>
        {/* Hero Section */}
        <div className="flex flex-col justify-center pt-8">
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

        {/* AI Workstation Visualization */}
        <div className="mt-8">
          <AIWorkstation />
        </div>

        {/* Projects and Tech Stack */}
        <div className="mt-8">
          <Products />
          <TechStack />
        </div>

        {/* Chat Interface */}
        <div className="mt-8 mb-4">
          <h2 className="text-4xl font-bold mb-4 text-center pt-10 pb-10">Ask Anything about Hitesh!</h2>
          <div className="h-[450px] w-full max-w-3xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </Container>
    </div>
  );
}