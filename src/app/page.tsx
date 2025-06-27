import { Container } from "@/components/Container";
import { Products } from "@/components/Products";
import { HeroPipeline } from "@/components/HeroPipeline";
import { Heading } from "@/components/Heading";
import { Paragraph } from "@/components/Paragraph";
import { TechStack } from "@/components/TechStack";

export default function Home() {
  return (
    <Container>
      {/* The one true hero component */}
      <HeroPipeline />

      <div className="mt-24">
        <Heading
          as="h2"
          className="font-black text-lg md:text-lg lg:text-lg mb-4 flex items-center gap-2"
        >
          <span className="text-2xl">⚡</span>
          Featured Project Details
        </Heading>
        <Paragraph className="mb-8 text-gray-600">
          A closer look at the projects built from the pipeline visualized above.
        </Paragraph>
        <Products />
        <TechStack />
      </div>
    </Container>
  );
}