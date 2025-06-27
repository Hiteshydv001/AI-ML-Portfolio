"use client";
import React, { useId } from "react";
import { StaticImageData } from "next/image";
import { twMerge } from "tailwind-merge";

export const MacbookSVG = ({
  src,
  className,
}: {
  src: string | StaticImageData;
  className?: string;
}) => {
  // useId ensures the clip-path has a unique ID, crucial for SVGs
  const id = useId();
  const clipPathId = `screen-clip-${id}`;

  // Handle both string URLs and Next.js StaticImageData objects for the src
  const imageUrl = typeof src === "string" ? src : src.src;

  return (
    <svg
      viewBox="0 0 200 140"
      className={twMerge("w-full h-auto", className)}
    >
      <g className="group">
        {/* Shadow */}
        <ellipse
          cx="100"
          cy="135"
          rx="85"
          ry="3"
          fill="#000"
          opacity="0.1"
          className="transition-opacity duration-300 group-hover:opacity-15"
        />

        {/* Laptop Base */}
        <path d="M20 120 L180 120 L175 130 L25 130 Z" fill="#d1d5db" />
        <path d="M20 120 L180 120 L175 125 L25 125 Z" fill="#e5e7eb" />

        {/* Screen Bezel */}
        <rect x="25" y="20" width="150" height="100" rx="8" fill="#1f2937" />

        {/* Screen Background (in case image is transparent) */}
        <rect x="30" y="25" width="140" height="90" rx="4" fill="#ffffff" />

        {/* The Project Image, clipped to the screen shape */}
        <image
          href={imageUrl}
          x="30"
          y="25"
          width="140"
          height="90"
          clipPath={`url(#${clipPathId})`}
        />

        {/* Definition for the clipping path */}
        <defs>
          <clipPath id={clipPathId}>
            <rect x="30" y="25" width="140" height="90" rx="4" />
          </clipPath>
        </defs>

        {/* Camera */}
        <circle cx="100" cy="30" r="1.5" fill="#6b7280" />
      </g>
    </svg>
  );
};