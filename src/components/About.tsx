"use client";
import { Paragraph } from "@/components/Paragraph";
import Image from "next/image";
import { motion } from "framer-motion";

export default function About() {
  const images = [
    "images/About-1.png",
    "images/About-2.png",
    "images/About-3.png",
    "images/About-4.png",
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{
              opacity: 0,
              y: -50,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? 3 : -3,
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="AI and Machine Learning"
              className="rounded-md object-cover transform rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
              style={{ objectFit: "cover" }}
              unoptimized
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl">
        <Paragraph className=" mt-4">
          I am an AI/ML Engineer passionate about building intelligent systems
          that bridge machine learning, deep learning, and automation to solve
          real-world challenges. With expertise in Generative AI, NLP, Computer
          Vision, and Reinforcement Learning, I specialize in designing
          multi-agent AI systems, AI-powered automation, and
          blockchain-integrated solutions.
        </Paragraph>
        <Paragraph className=" mt-4">
          My work involves implementing deep learning models, LLMs, and
          Generative AI to drive automation and intelligence. I have a strong
          foundation in designing specialized AI agents for tasks like text
          summarization, sentiment analysis, and intelligent automation. I have
          developed practical tools such as AI-driven proctoring systems and
          LinkedIn comment automation.
        </Paragraph>

        <Paragraph className=" mt-4">
          I am also experienced in creating secure, decentralized solutions
          using technologies like Ethereum, Solidity & Web3. My goal is to
          leverage MLOps and modern cloud technologies to deploy scalable and
          robust AI models.
        </Paragraph>
        <Paragraph className=" mt-4">
          I&apos;m always open to collaborations on AI research, automation projects,
          and innovative AI solutions. Let&apos;s connect and push the boundaries of
          machine intelligence together!
        </Paragraph>
      </div>
    </div>
  );
}