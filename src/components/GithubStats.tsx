"use client";
import React from "react";
import { motion } from "framer-motion";

const GitHubStatCard = ({ title, value, icon }: { title: string; value: string | number; icon: React.ReactNode }) => (
  <div className="bg-gray-100/80 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
    <div className="text-black flex-shrink-0">
      {icon}
    </div>
    <div>
      <p className="text-xs sm:text-sm text-gray-500">{title}</p>
      <p className="text-base sm:text-lg font-semibold text-black">{value}</p>
    </div>
  </div>
);

const LanguageBar = ({ language, percentage }: { language: string; percentage: number }) => (
  <div className="w-full">
    <div className="flex justify-between text-xs sm:text-sm mb-1">
      <span className="text-gray-600">{language}</span>
      <span className="text-black font-medium">{percentage}%</span>
    </div>
    <div className="h-2 bg-gray-100/50 rounded-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 1, delay: 0.2 }}
        className="h-full rounded-full bg-black"
      />
    </div>
  </div>
);

const GithubStats = () => {
  return (
    <div className="w-full my-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <div className="bg-gray-100/80 p-2.5 sm:p-3 rounded-xl">
          <svg width="24" height="24" fill="black"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" /></svg>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-black">
          GitHub Activity
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative max-w-full sm:max-w-2xl lg:max-w-full">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-gray-800/30 backdrop-blur-xl rounded-3xl border border-white/10 p-4 sm:p-6 shadow-2xl"
        >
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 mb-6 md:mb-8">
            <GitHubStatCard
              title="Total Stars"
              value="20"
              icon={<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>}
            />
            <GitHubStatCard
              title="Contributions"
              value="1,021"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>}
            />
            <GitHubStatCard
              title="Pull Requests"
              value="9"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>}
            />
            <GitHubStatCard
              title="Issues"
              value="59"
              icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            />
          </div>

          {/* Language Stats */}
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg font-semibold text-black mb-3 sm:mb-4">Most Used Languages</h3>
            <div className="space-y-3">
              <LanguageBar language="Jupyter Notebook" percentage={41.82} />
              <LanguageBar language="TypeScript" percentage={32.48} />
              <LanguageBar language="Python" percentage={14.06} />
              <LanguageBar language="HTML" percentage={4.92} />
              <LanguageBar language="JavaScript" percentage={4.38} />
              <LanguageBar language="CSS" percentage={2.34} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GithubStats;
