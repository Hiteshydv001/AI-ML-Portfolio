import React from "react";

const GithubStats = () => {
  return (
    <div className="w-full flex flex-col items-center mt-10 mb-8">
      <div className="flex items-center gap-3 mb-8">
        <svg width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10 text-black dark:text-white inline-block align-middle"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.66-.22.66-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.1-1.46-1.1-1.46-.9-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85.004 1.71.12 2.51.35 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.73 0 .27.16.58.67.48A10.01 10.01 0 0022 12c0-5.52-4.48-10-10-10z" /></svg>
        <span className="text-4xl font-extrabold tracking-tight text-black dark:text-white">GitHub Stats</span>
      </div>
      <div className="flex justify-center w-full">
        <div className="bg-black dark:bg-white border-4 border-white dark:border-black shadow-2xl p-4 rounded-3xl hover:scale-[1.01] transition-transform duration-200 w-full max-w-3xl flex flex-col items-center gap-6">
          <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-center">
            <img
              src="https://github-readme-stats.vercel.app/api?username=Hiteshydv001&show_icons=true&theme=radical&hide_title=true"
              alt="GitHub Stats"
              className="rounded-2xl w-full max-w-sm pl-8"
            />
            <img
              src="https://github-readme-streak-stats.herokuapp.com/?user=Hiteshydv001&theme=radical"
              alt="GitHub Streak"
              className="rounded-4xl w-full max-w-sm pr-8"
            />
          </div>
          <div className="flex justify-center w-full">
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=Hiteshydv001&layout=compact&theme=radical"
              alt="Top Languages"
              className="rounded-2xl w-full max-w-md pl-8"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GithubStats;
