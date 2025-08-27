# Hitesh Kumar - Interactive AI/ML Engineer Portfolio

<p align="center">
  <img src="https://github.com/Hiteshydv001/AI-ML-Portfolio/blob/main/portfolio.png" alt="A GIF showcasing the interactive features of the portfolio, including the AI assistant and the drawing game." width="850">
  <br/>
  <em>A dynamic and interactive portfolio built with Next.js, featuring a custom AI assistant, an animated data pipeline visualization, and an AI-powered sketch recognition game.</em>
</p>

<p align="center">
  <a href="https://hitesh-aiml.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Live%20Demo-hitesh--bot--portfolio.vercel.app-blue?style=for-the-badge&logo=vercel" alt="Live Demo"></a>
</p>

This isn't just a portfolio; it's a living showcase of my skills as an AI/ML Engineer. It's a full-stack application designed to demonstrate proficiency in modern web technologies, generative AI, and creating engaging user experiences.

## ✨ Core Features

-   **🤖 AI Assistant (HiteshBot)**: Chat with a custom AI assistant trained on my professional background (resume, projects, experience). It leverages a **Retrieval-Augmented Generation (RAG)** pipeline with the Vercel AI SDK to provide accurate, context-aware answers in real-time.

-   **🖥️ Animated AI Workstation**: A unique hero section component that visualizes my entire profile—from experience and skills to publications—as a dynamic data processing pipeline inside an animated terminal.

-   **🎨 AI-Powered Drawing Game**: An interactive "Guess the Drawing" game that demonstrates the multimodal capabilities of **Google Gemini**. Users can sketch an object, and the AI model identifies it in real-time via a serverless API route.

-   **🚀 Edge-First APIs**: The chat and sketch-recognition APIs are built as Next.js API Routes running on the Edge Runtime for minimal latency and global scalability.

-   **Modern & Animated UI**: Built with Next.js 14 (App Router), TypeScript, and Tailwind CSS. The entire interface is enhanced with smooth, performant animations using **Framer Motion**.

-   **Content-Rich Research Section**: Research papers and articles are authored in **MDX**, allowing for a rich content experience that seamlessly blends technical writing with interactive React components.

## 🏛️ Architectural Deep-Dive

This portfolio is architected as a modern, decoupled web application. The frontend handles all user interactions, while specialized API routes and external services manage the AI logic.

### AI Assistant (HiteshBot) - RAG Pipeline

The chatbot is the most complex feature, utilizing a RAG pipeline to ensure responses are grounded in my actual professional data.

```
+----------------+      +-----------------------+      +---------------------------+
| User Interface | ---->| Next.js API Route     | ---->| RAG Backend Service       |
| (React)        |      | (/api/v1/chat @ Edge) |      | (FastAPI on Render)       |
+----------------+      +-----------------------+      +---------------------------+
                                                               |
                                                               |
                                            +------------------+------------------+
                                            |                  |                  |
                                            v                  v                  v
                                   +----------------+  +-----------------+  +-----------------+
                                   | Query Rewriter |  | Vector Database |  | LLM (Gemini)    |
                                   | (Intent)       |  | (Embeddings)    |  | (Generation)    |
                                   +----------------+  +-----------------+  +-----------------+

```

1.  **User Input**: A user sends a message through the React chat interface.
2.  **API Route**: The Next.js frontend calls the `/api/v1/chat` Edge Function.
3.  **Backend Forwarding**: The Edge Function streams the request to a dedicated Python backend service hosted on Render. This service houses the core RAG logic.
4.  **Vector Search**: The backend converts the user's query into a vector embedding and searches a vector database (pre-loaded with my resume, project details, etc.) to find the most relevant information chunks.
5.  **Prompt Augmentation**: The retrieved context is combined with the original query and system instructions into a detailed prompt.
6.  **LLM Generation**: This augmented prompt is sent to a powerful LLM (like Google Gemini) to generate a response that is both conversational and factually grounded in the provided context.
7.  **Streaming Response**: The response is streamed back through the entire chain to the user, providing a real-time, typewriter-like effect.

## 🛠️ Technology Stack

| Category         | Technology & Libraries                                                                  |
| ---------------- | --------------------------------------------------------------------------------------- |
| **Frontend**     | [Next.js](https://nextjs.org/) 14 (App Router), [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com/) |
| **UI & Animations**| [Framer Motion](https://www.framer.com/motion/), [Shadcn UI](https://ui.shadcn.com/) (inspiration), [Lucide Icons](https://lucide.dev/) |
| **Content**      | [MDX](https://mdxjs.com/) with [Rehype Prism](https://github.com/mapbox/rehype-prism) for code highlighting |
| **AI & ML**      | [Vercel AI SDK](https://sdk.vercel.ai/), [LangChain](https://www.langchain.com/), [Google Gemini API](https://ai.google.dev/), [TensorFlow.js](https://www.tensorflow.org/js) |
| **API Backend**  | Next.js API Routes (Edge Runtime), Python/FastAPI for the RAG service |
| **Deployment**   | [Vercel](https://vercel.com/) (Frontend & Edge Functions), [Render](https://render.com/) (RAG Backend) |

## 🚀 Getting Started Locally

### Prerequisites

-   **Node.js**: v20.x or newer
-   **npm** or **yarn**
-   **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Hiteshydv001/hiteshydv001-ai-ml-portfolio.git
cd hiteshydv001-ai-ml-portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a file named `.env.local` in the project root. This is needed for the "Guess the Drawing" game. The AI Chatbot uses a hardcoded backend URL and does not require a local key.

```env
# .env.local

# Required for the AI Drawing Game (/games/guess-drawing)
# Get a free key from Google AI Studio: https://makersuite.google.com/
GEMINI_API_KEY="YOUR_GEMINI_API_KEY"
```

### 4. Run the Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

## 📂 Project Structure

The project uses the Next.js App Router for a feature-centric file organization.

```
hiteshydv001-ai-ml-portfolio/
├── src/
│   ├── app/
│   │   ├── (pages)/          # Main pages (Home, About, Projects, etc.)
│   │   │   └── page.tsx      # Entry component for a route
│   │   ├── api/              # API routes (chat proxy, sketch recognition)
│   │   │   └── v1/chat/route.ts # Edge function for the chatbot
│   │   └── layout.tsx        # Root layout with shared UI (Sidebar, Footer)
│   ├── components/           # All reusable React components
│   │   ├── AIWorkstation.tsx # The animated terminal visualization
│   │   └── ChatInterface.tsx # The AI assistant UI
│   ├── constants/            # Static data arrays (nav links, project info, etc.)
│   └── lib/                  # Helper functions and utilities
├── public/                   # Static assets like images and fonts
└── next.config.mjs           # Next.js configuration, including MDX setup
```

## 📜 License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
```
