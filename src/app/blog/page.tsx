import { Container } from "@/components/Container";
import { Heading } from "@/components/Heading";
import { Highlight } from "@/components/Highlight";
import { Paragraph } from "@/components/Paragraph";
import { getAllBlogs } from "../../../lib/getAllBlogs";
import { Blogs } from "@/components/Blogs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog & Research | Hitesh Kumar",
  description:
    "I write about AI, Machine Learning, software development, and my research work.",
};

export default async function Blog() {
  const blogs = await getAllBlogs();
  const data = blogs.map(({ component, ...meta }) => meta);

  return (
    <Container>
      <span className="text-4xl">📝</span>
      <Heading className="font-black pb-4">
        Blog & Research Publications
      </Heading>
      <Paragraph className="pb-10">
        This is where I share my <Highlight>research and insights</Highlight> on
        AI, machine learning, and software development.
      </Paragraph>
      <Blogs blogs={data} />
    </Container>
  );
}