// Use placeholder images temporarily
const multiRagAgent = "/images/MultiRAG.png";
const linkedinAutomate = "/images/LinkedinAutomate.png";
const guardAI = "/images/GuardAI.png";
const wasteClassification = "/images/WasteClassification.png";

export const products = [
  {
    href: "https://github.com/Hiteshydv001/Multi-RAG-Agent",
    livePreviewUrl: "https://multi-rag-agent.vercel.app",
    title: "Multi-RAG-Agent Tools",
    description:
      "Engineered a Multi-Agent AI system automating text summarization, article generation, and data sanitization, improving workflow efficiency by 40%.",
    thumbnail: multiRagAgent,
    images: [multiRagAgent],
    stack: ["Python", "Streamlit", "FAISS", "Hugging Face", "Gemini API"],
    slug: "multi-rag-agent",
    content: (
      <div>
        <p>
          This project features a sophisticated Multi-Agent AI system designed
          to streamline content-related workflows. It automates complex tasks
          like text summarization, article generation, and data sanitization.
        </p>
        <p>
          By designing a modular architecture with over five specialized
          agents, the system achieves 95% automation accuracy and reduces
          manual effort in large dataset extraction and cleaning by 60%.
        </p>
      </div>
    ),
  },
  {
    href: "https://github.com/Hiteshydv001/Linkedin-automate-comment",
    livePreviewUrl: "https://linkedin-automate.vercel.app",
    title: "LinkedIn Automate Comment",
    description:
      "Built an AI-driven automation system for LinkedIn comments, boosting engagement efficiency by 50% by processing over 1,000 posts daily.",
    thumbnail: linkedinAutomate,
    images: [linkedinAutomate],
    stack: ["Python", "Selenium", "Gemini API", "FastAPI", "Playwright"],
    slug: "linkedin-comment-automation",
    content: (
      <div>
        <p>
          An AI-powered system designed to automate interactions on LinkedIn to
          enhance networking and engagement. The tool scrapes posts, performs
          sentiment analysis, and uses an LLM (Gemini) to generate relevant and
          contextual comments.
        </p>
        <p>
          It processes over 1,000 posts daily and generates comments with 90%
          accuracy, effectively automating the process of posting to streamline
          professional networking.
        </p>
      </div>
    ),
  },
  {
    href: "https://github.com/Hiteshydv001/Guard-AI-Designing-Remote-Proctoring-System",
    livePreviewUrl: "https://guard-ai-proctoring.vercel.app",
    title: "Guard AI - Remote Proctoring System",
    description:
      "Developed an AI-powered proctoring system with real-time facial recognition, gaze tracking, and lip movement detection to enhance exam integrity.",
    thumbnail: guardAI,
    images: [guardAI],
    stack: ["Python", "FastAPI", "OpenCV", "Streamlit", "NextJS"],
    slug: "guard-ai-proctoring",
    content: (
      <div>
        <p>
          Guard AI is an advanced remote proctoring system that leverages AI to
          ensure academic integrity during online examinations. It incorporates
          real-time monitoring features to detect suspicious activities.
        </p>
        <p>
          Key features include facial recognition, gaze tracking, lip movement
          detection, and monitoring of screen activity and unauthorized device
          usage. The system was developed in collaboration with 30-40
          contributors and successfully onboarded 15-20 users for testing.
        </p>
      </div>
    ),
  },
  {
    href: "https://github.com/Hiteshydv001/Waste-classification-model-cnn",
    livePreviewUrl: "https://waste-classification.vercel.app",
    title: "Waste Classification Model",
    description:
      "Built a waste classification model using CNN and YOLO, achieving 92% accuracy on test data. Deployed a real-time detection demo with Streamlit.",
    thumbnail: wasteClassification,
    images: [wasteClassification],
    stack: ["Python", "CNN", "YOLO", "Streamlit", "Machine Learning"],
    slug: "waste-classification",
    content: (
      <div>
        <p>
          As part of the Edunet Foundation (AICTE & SHELL) internship, I
          developed a deep learning model for waste classification. The model,
          built using Convolutional Neural Networks (CNN) and YOLO, can
          accurately distinguish between different types of waste.
        </p>
        <p>
          The project ranked in the top 40 out of over 5,000 submissions by
          industry experts. We enhanced the model&apos;s inference speed by 25%,
          enabling efficient real-time usage in a Streamlit-based demo
          application.
        </p>
      </div>
    ),
  },
];