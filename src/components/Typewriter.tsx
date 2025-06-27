"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

export interface ITypewriter {
  text: string;
  delay: number;
  className?: string;
}

export default function Typewriter({ text, delay, className }: ITypewriter) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

  useEffect(() => {
    const controls = animate(count, text.length, {
      type: "tween",
      delay: delay,
      duration: text.length * 0.04, // Adjust typing speed here
      ease: "linear",
    });
    return controls.stop;
  }, [text, delay, count]);

  return (
    <span className={className}>
      <motion.span>{displayText}</motion.span>
      {/* Blinking Cursor */}
      <motion.span
        className="inline-block w-2 h-5 bg-green-400 ml-1"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: delay + 0.5 }}
        aria-hidden="true"
      />
    </span>
  );
}