"use client";
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MacBookTerminal } from './MacBookTerminal';
import { CloudServer } from './CloudServer';
import { MobileDevice } from './MobileDevice';
import { VectorDatabase } from './VectorDatabase';
import { DataFlowLines } from './DataFlowLines';
import { ChatInterface } from './ChatInterface';
import { Heading } from './Heading';
import { Paragraph } from './Paragraph';

export const MLPipelineVisualization = () => {
    const [animationStep, setAnimationStep] = React.useState(0);
    const shouldReduceMotion = useReducedMotion();

    React.useEffect(() => {
        const interval = setInterval(() => {
            setAnimationStep(prev => (prev + 1) % 4);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2,
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: shouldReduceMotion ? { opacity: 0 } : { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.2,
                ease: "easeOut"
            }
        }
    };

  return (
    <div className="w-full py-8 md:py-16">
        {/* Header */}
        <motion.div 
            className="text-center mb-8 md:mb-16" 
            initial="hidden"
            animate="visible"
            variants={itemVariants}
        >
            <Heading as="h1" className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              The Anatomy of an LLM
            </Heading>
            <Paragraph className="text-lg md:text-xl text-gray-600 mt-4 max-w-3xl mx-auto px-4">
              An animated blueprint illustrating my end-to-end process for building Large Language Models—from raw data collection and rigorous training to final deployment and real-world application.
            </Paragraph>
        </motion.div>

        {/* Pipeline Visualization */}
        <motion.div 
            className="relative max-w-7xl mx-auto mb-8 md:mb-12 h-[300px] md:h-[400px]"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
        >
          <DataFlowLines />
          <div className="absolute inset-0 grid grid-cols-4 items-center px-4">
            <MacBookTerminal animationStep={animationStep} />
            <CloudServer />
            <VectorDatabase />
            <MobileDevice />
          </div>
        </motion.div>

        {/* Chat Interface Section */}
        <motion.div 
            className="max-w-4xl mx-auto mt-16 md:mt-32 px-4"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
        >
          <div className="text-center mb-8">
            <Heading as="h2" className="text-3xl md:text-4xl font-black mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Chat with HiteshBot
            </Heading>
            <Paragraph className="text-gray-600">Ask me about my projects, skills, and experience.</Paragraph>
          </div>
          <ChatInterface />
        </motion.div>
    </div>
  );
}; 