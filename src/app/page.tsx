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
    <div className="relative pb-16">
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

        {/* --- AI Workstation Visualization --- */}
        <div className="mt-16 h-[600px]">
          <AIWorkstation />
        </div>

        {/* --- Projects and Tech Stack Section --- */}
        <div className="mt-16">
      <Products />
      <TechStack />
        </div>

        {/* Chat Interface Section */}
        <section className="py-20">
          <h2 className="text-4xl font-bold mb-12 text-center">Chat with AI Assistant</h2>
          <div className="h-[800px]">
            <ChatInterface />
          </div>
        </section>
    </Container>
    </div>
  );
}