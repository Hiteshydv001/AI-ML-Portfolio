import Image from "next/image";
import React from "react";
import { Heading } from "./Heading";
import { twMerge } from "tailwind-merge";

export const TechStack = () => {
  const stack = [
    {
      title: "Python",
      src: "https://res.cloudinary.com/dx6tl6aa2/image/upload/v1717259132/python_lnprij.svg",
      className: "h-10 w-10",
    },
    {
      title: "TensorFlow",
      src: "https://res.cloudinary.com/dx6tl6aa2/image/upload/v1717259132/tensorflow_w2bcoi.svg",
      className: "h-10 w-10",
    },
    {
      title: "PyTorch",
      src: "https://res.cloudinary.com/dx6tl6aa2/image/upload/v1717259131/pytorch_x5ni5p.svg",
      className: "h-10 w-10",
    },
    {
      title: "Next.js",
      src: "/images/logos/next.png",
      className: "h-10 w-14",
    },
    {
      title: "FastAPI",
      src: "https://res.cloudinary.com/dx6tl6aa2/image/upload/v1717259131/fastapi_t082xg.svg",
      className: "h-10 w-10",
    },
    {
      title: "Docker",
      src: "https://res.cloudinary.com/dx6tl6aa2/image/upload/v1717259131/docker_t5hz0o.svg",
      className: "h-10 w-12",
    },
    {
      title: "AWS",
      src: "/images/logos/aws.webp",
      className: "h-10 w-10",
    },
    {
      title: "Hugging Face",
      src: "https://res.cloudinary.com/dx6tl6aa2/image/upload/v1717259131/huggingface_xxrolj.svg",
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
            key={item.src}
            width={`200`}
            height={`200`}
            alt={item.title}
            className={twMerge(
              "object-contain mr-4 mb-4",
              item.className
            )}
          />
        ))}
      </div>
    </div>
  );
};