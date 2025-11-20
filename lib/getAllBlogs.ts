import glob from "fast-glob";
import * as path from "path";

// Remove the importBlog function as we're now using static data

export async function getAllBlogs() {
  // Define the research papers metadata directly
  const blogs = [
    {
      slug: "train-ticket-prediction",
      date: "2024-11-17",
      title: "Train Waitlisted Ticket Confirmation Prediction Using Machine Learning",
      description: "A machine learning model to predict the confirmation probability of waitlisted train tickets, analyzing historical Indian Railways data to support better travel planning decisions.",
      venue: {
        status: 'Published',
        name: 'IEEE Xplore (ICACCTech)',
        year: '2024',
        url: 'https://ieeexplore.ieee.org'
      },
      image: "/images/Publication-2.png",
      tags: ["Machine Learning", "Prediction", "Python", "Research"]
    },
    {
      slug: "weather-traffic-routing",
      date: "2025-02-21",
      title: "Weather-Integrated Traffic Routing with Dynamic Speed Prediction",
      description: "This research focuses on integrating real-time weather data into traffic routing algorithms for smart city applications and designing AI models for speed prediction.",
      venue: {
        status: 'Accepted',
        name: 'ICRAAI',
        year: '2025',
        url: ''
      },
      image: "/images/Publication-1.png",
      tags: ["AI", "Smart Cities", "Traffic Optimization", "Research"]
    }
  ];

  return blogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return dateB.getTime() - dateA.getTime();
  });
}
