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
        <div className="mt-16 mb-8">
          <div className="text-center mb-8 px-4">
            <h2 className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-sky-500 to-blue-600 bg-clip-text text-transparent [text-wrap:balance]">
              Ask Anything about Hitesh! ✨
            </h2>
            <p className="text-gray-700 text-base md:text-lg mt-3 font-medium antialiased [text-wrap:balance]">
              Chat with my AI assistant to learn more about my work, experience, and projects
            </p>
          </div>

          {/* Chat interface */}
          <div className="max-w-3xl mx-auto bg-white/60 backdrop-blur rounded-2xl border border-gray-200/60 shadow-lg p-1">
            <div className="h-[450px]">
              <ChatInterface />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}