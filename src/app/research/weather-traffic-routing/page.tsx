import Content from "./content.mdx";
import { BlogLayout } from "@/components/BlogLayout";

const meta = {
  date: "2025-02-21",
  title: "Weather-Integrated Traffic Routing with Dynamic Speed Prediction",
  description: "Accepted at ICRAAI 2025, this research focuses on integrating real-time weather data into traffic routing algorithms for smart city applications and designing AI models for speed prediction.",
  image: "/images/Publication-1.png",
  tags: ["AI", "Smart Cities", "Traffic Optimization", "Research"]
};

export default function Page() {
  return (
    <BlogLayout meta={meta}>
      <Content />
    </BlogLayout>
  );
}