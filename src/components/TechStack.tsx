import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

export const TechStack = () => {
  const stack = [
    {
      title: "Python",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      className: "h-10 w-10",
    },
    {
      title: "TensorFlow",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg",
      className: "h-10 w-10",
    },
    {
      title: "PyTorch",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg",
      className: "h-10 w-10",
    },
    {
      title: "Next.js",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
      className: "h-10 w-14 bg-white p-1 rounded-md", // Optional styling for visibility
    },
    {
      title: "FastAPI",
      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg",
      className: "h-10 w-10",
    },
    {
      title: "Docker",
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
      className: "h-10 w-12",
    },
    {
      title: "AWS",
      src: "/images/logos/aws.webp",
      className: "h-10 w-10",
    },
    {
      title: "Hugging Face",
      src: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg",
      className: "h-10 w-10",
    },
  ];

  return (
    <div>
      <Heading
        as="h2"
        className="font-black text-lg md:text-lg lg:text-lg mt-20 mb-4"
      >
        Core Tech Stack
      </Heading>
      <div className="flex flex-wrap">
        {stack.map((item) => (
          <Image
            src={item.src}
            key={item.title}
            width={200}
            height={200}
            alt={item.title}
            className={twMerge("object-contain mr-4 mb-4", item.className)}
          />
        ))}
      </div>
    </div>
  );
};
