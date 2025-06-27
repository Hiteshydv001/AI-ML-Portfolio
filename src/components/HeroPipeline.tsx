"use client";
import React from 'react';
import { Stage1_DataIngestion } from './Stage1_DataIngestion';
import { Stage2_TrainingHub } from './Stage2_TrainingHub';
import { Stage3_VectorStore } from './Stage3_VectorStore';
import { Stage4_Deployment } from './Stage4_Deployment';
import { ConnectingLines } from './ConnectingLines';
import { ChatInterface } from './ChatInterface';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';

export const HeroPipeline = () => {
  return (
    <div className="w-full py-16">
        {/* Pipeline Visualization */}
        <div className="relative max-w-7xl mx-auto mb-12 h-[350px]">
          <ConnectingLines />
          <div className="absolute inset-0 grid grid-cols-4 items-center px-4">
            <Stage1_DataIngestion />
            <Stage2_TrainingHub />
            <Stage3_VectorStore />
            <Stage4_Deployment />
          </div>
        </div>

        {/* Chat Interface Section */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className="text-center mb-8">
            <Heading as="h2" className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chat with HiteshBot
            </Heading>
            <Paragraph className="text-gray-600">Ask me about my projects, skills, and experience.</Paragraph>
          </div>
          <ChatInterface />
        </div>
    </div>
  );
}; 