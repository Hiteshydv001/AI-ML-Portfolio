import Content from "./content.mdx";
import { BlogLayout } from "@/components/BlogLayout";

const meta = {
  date: "2024-11-17",
  title: "Train Waitlisted Ticket Confirmation Prediction Using Machine Learning",
  description: "A machine learning model to predict the confirmation probability of waitlisted train tickets, analyzing historical Indian Railways data to support better travel planning decisions.",
  image: "/images/Publication-2.png",
  tags: ["Machine Learning", "Prediction", "Python", "Research"]
};

export default function Page() {
  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  );
}