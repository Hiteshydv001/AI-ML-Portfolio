"use client";
import React from "react";
import { Heading } from "./Heading";
import { Product } from "@/types/products";
import { products } from "@/constants/products";
import Link from "next/link";
import { Paragraph } from "./Paragraph";
import { motion } from "framer-motion";
import { MacbookSVG } from "./MacbookSVG"; // Import the new SVG component

export const Products = () => {
  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        {products.map((product: Product, idx: number) => (
          <motion.div
            key={product.href}
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{ duration: 0.3, delay: idx * 0.1 }}
            className="group hover:bg-gray-50/80 rounded-2xl transition duration-200 p-4"
          >
            <div className="flex flex-col md:flex-row items-start md:space-x-6">
              {/* Image Frame */}
              <Link
                href={product.slug ? `/projects/${product.slug}` : product.href}
                className="w-full md:w-2/5 flex-shrink-0 mb-4 md:mb-0"
              >
                <MacbookSVG src={product.thumbnail} className="drop-shadow-lg" />
              </Link>

              {/* Text Content */}
              <div className="flex-1">
                <Link href={product.slug ? `/projects/${product.slug}` : product.href}>
                  <Heading
                    as="h3"
                    className="font-semibold text-lg md:text-xl lg:text-xl"
                  >
                    {product.title}
                  </Heading>
                  <Paragraph className="text-xs lg:text-sm mt-2 max-w-xl">
                    {product.description}
                  </Paragraph>
                </Link>
                <div className="flex flex-wrap gap-2 md:mb-1 mt-4">
                  {product.stack?.map((stack: string) => (
                    <span
                      key={stack}
                      className="px-2.5 py-1 bg-sky-50 text-sky-600 text-xs rounded-full font-medium"
                    >
                      {stack}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-row gap-3 mt-4 items-center">
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-white text-gray-800 border border-gray-200 shadow-sm sm:backdrop-blur-sm group-hover/button:bg-gray-50 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-xs font-medium px-3 py-1.5 origin-left"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </a>

                  {product.livePreviewUrl && (
                    <a
                      href={product.livePreviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-sm shadow-black/10 sm:backdrop-blur-sm group-hover/button:bg-gray-700 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-xs font-medium px-3 py-1.5 origin-left"
                    >
                      Live Demo
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3 h-3 group-hover:translate-x-0.5 transition-transform"
                      >
                        <path d="M5 12l14 0"></path>
                        <path d="M13 18l6 -6"></path>
                        <path d="M13 6l6 6"></path>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};