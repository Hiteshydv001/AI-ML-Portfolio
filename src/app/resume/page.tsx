import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { WorkHistory } from "@/components/WorkHistory";

export default function Resume() {
  return (
    <Container>
      <span className="text-4xl">💼</span>
      <Heading className="font-black">Work History</Heading>
      <Paragraph className="max-w-xl mt-4">
        I am an AI/ML Engineer passionate about{" "}
        <Highlight>building intelligent systems</Highlight> that solve
        real-world challenges through innovation and automation.
      </Paragraph>
      <WorkHistory />
    </Container>
  );
}