import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Patents | Hitesh Kumar",
  description:
    "My research publications, patents, and technical contributions in AI and Machine Learning.",
};

export default async function Blog() {
  const blogs = await getAllBlogs();
  const data = blogs.map(({ component, ...meta }) => meta);

  return (
    <Container>
      <span className="text-4xl">🔬</span>
      <Heading className="font-black pb-4">
        Research Papers & Patents
      </Heading>
      <Paragraph className="pb-10">
        Showcasing my <Highlight>research publications</Highlight> and{" "}
        <Highlight>patent contributions</Highlight> in artificial intelligence,
        machine learning, and advanced technology.
      </Paragraph>
      <Blogs blogs={data} />
    </Container>
  );
}