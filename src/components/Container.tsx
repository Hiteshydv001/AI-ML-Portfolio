"use client";

import React from "react";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
  return (
    <main className={`max-w-4xl w-full mx-auto py-8 px-4 md:px-10 ${className}`}>
      {children}
    </main>
  );
};

export default Container;
