"use client";

import { motion } from "framer-motion";
import { Heading } from "./Heading";
import { Paragraph } from "./Paragraph";
import { MacbookSVG } from "./MacbookSVG";
import Link from "next/link";
import { experiences } from "@/constants/experiences";

export default function Experience() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-10">
        {experiences.map((experience, idx) => (
          <motion.div
            key={idx}
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
                href={`/experience/${experience.slug}`}
                className="w-full md:w-2/5 flex-shrink-0 mb-4 md:mb-0"
              >
                <MacbookSVG 
                  src={experience.image || "/images/placeholder.png"} 
                  className="drop-shadow-lg" 
                />
              </Link>

              {/* Text Content */}
              <div className="flex-1">
                <div>
                  <Link href={`/experience/${experience.slug}`}>
                    <Heading
                      as="h3"
                      className="font-semibold text-lg md:text-xl lg:text-xl hover:text-sky-600 transition-colors"
                    >
                      {experience.title} • {experience.company}
                    </Heading>
                  </Link>
                  <Paragraph className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {experience.location} • {experience.period}
                  </Paragraph>
                </div>

                <ul className="list-disc space-y-2 pl-4 text-sm text-zinc-600 dark:text-zinc-400 mt-4">
                  {experience.description.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-4">
                  {experience.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-sky-50 text-sky-600 text-xs rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-row gap-3 mt-4 items-center">
                  <Link
                    href={`/experience/${experience.slug}`}
                    className="inline-flex items-center gap-1.5 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-gray-800 text-white shadow-sm shadow-black/10 sm:backdrop-blur-sm group-hover/button:bg-gray-700 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-xs font-medium px-3 py-1.5 origin-left"
                  >
                    View Details
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
                      className="w-3.5 h-3.5 group-hover/button:translate-x-0.5 transition-transform"
                    >
                      <path d="M5 12h14"></path>
                      <path d="m12 5 7 7-7 7"></path>
                    </svg>
                  </Link>

                  {experience.companyUrl && (
                    <a
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-white text-gray-800 border border-gray-200 shadow-sm sm:backdrop-blur-sm group-hover/button:bg-gray-50 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-xs font-medium px-3 py-1.5 origin-left"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="w-3.5 h-3.5"
                      >
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                      </svg>
                      Company
                    </a>
                  )}

                  {experience.certificateUrl && (
                    <a
                      href={experience.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 group/button rounded-full hover:scale-105 focus:outline-none transition ring-offset-gray-900 bg-white text-gray-800 border border-gray-200 shadow-sm sm:backdrop-blur-sm group-hover/button:bg-gray-50 group-hover/button:scale-105 focus-visible:ring-1 focus-visible:ring-offset-2 ring-gray-50/60 text-xs font-medium px-3 py-1.5 origin-left"
                    >
                      Certificate
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
                        className="w-3.5 h-3.5 group-hover/button:translate-x-0.5 transition-transform"
                      >
                        <path d="M5 12h14"></path>
                        <path d="m12 5 7 7-7 7"></path>
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
} 