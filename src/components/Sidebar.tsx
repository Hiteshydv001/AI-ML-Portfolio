"use client";
import { navLinks } from "@/constants/navlinks";
import { NavLink } from "@/types/navlink";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Heading } from "./Heading";
import { socials } from "@/constants/socials";
import { AnimatePresence, motion } from "framer-motion";
import { IconLayoutSidebarRightCollapse } from "@tabler/icons-react";
import { isMobile } from "@/lib/utils";

// Sidebar component
export const Sidebar = () => {
  // Sidebar is closed by default on mobile, open on desktop
  const [open, setOpen] = useState(false);

  // Open sidebar on desktop after mount
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setOpen(true);
      } else {
        setOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-lg border border-gray-200 lg:hidden focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
        onClick={() => setOpen(true)}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        style={{ boxShadow: '0 2px 16px 0 rgba(0,0,0,0.08)' }}
      >
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="10" width="20" height="2.5" rx="1.25" fill="#22223b"
            style={{
              transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
              transform: open ? 'translateY(8px) rotate(45deg)' : 'none'
            }}
          />
          <rect x="6" y="15" width="20" height="2.5" rx="1.25" fill="#22223b"
            style={{
              transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
              opacity: open ? 0 : 1
            }}
          />
          <rect x="6" y="20" width="20" height="2.5" rx="1.25" fill="#22223b"
            style={{
              transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
              transform: open ? 'translateY(-8px) rotate(-45deg)' : 'none'
            }}
          />
        </svg>
      </button>

      {/* Overlay and sidebar for mobile */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />
            {/* Sidebar */}
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="fixed top-0 left-0 z-50 w-64 h-screen bg-neutral-100 border-r border-gray-200/60 shadow-xl flex flex-col"
            >
              <div className="h-full px-6 py-8 overflow-y-auto flex flex-col">
                {/* Close button */}
                <button
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 shadow hover:bg-gray-100 transition lg:hidden"
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar"
                >
                  <span className="block w-5 h-0.5 bg-gray-700 rotate-45 absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(45deg)' }} />
                  <span className="block w-5 h-0.5 bg-gray-700 -rotate-45 absolute" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(-45deg)' }} />
                </button>
                <SidebarHeader />
                <Navigation setOpen={setOpen} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Always show sidebar on desktop */}
      <aside className="hidden lg:fixed lg:top-0 lg:left-0 lg:z-40 lg:w-64 lg:h-screen lg:bg-neutral-100 lg:border-r lg:border-gray-200/60 lg:shadow-xl lg:flex lg:flex-col">
        <div className="h-full px-6 py-8 overflow-y-auto flex flex-col">
          <SidebarHeader />
          <Navigation setOpen={setOpen} />
        </div>
      </aside>
    </>
  );
};

const SidebarHeader = () => {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <Image
        src="/images/profile-pic.png"
        width={40}
        height={40}
        alt="profile"
        className="rounded-full"
      />
      <div>
        <Heading as="p" className="text-sm md:text-sm lg:text-sm">
          Hitesh Kumar
        </Heading>
        <p className="text-xs text-secondary">AI/ML Engineer</p>
      </div>
    </Link>
  );
};

export const Navigation = ({
  setOpen,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <div className="flex flex-col space-y-1 my-10">
      {navLinks.map((link: NavLink) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={() => isMobile() && setOpen(false)}
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm",
            isActive(link.href) && "bg-white shadow-lg text-primary"
          )}
          {...(link.download ? { 
            download: true,
            target: "_blank",
            rel: "noopener noreferrer"
          } : {})}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500",
              link.download && "text-emerald-500"
            )}
          />
          <span>{link.title}</span>
        </Link>
      ))}

      <Heading as="p" className="text-sm md:text-sm lg:text-sm pt-10 px-2">
        Socials
      </Heading>
      {socials.map((link: NavLink) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={twMerge(
            "text-secondary hover:text-primary transition duration-200 flex items-center space-x-2 py-2 px-2 rounded-md text-sm"
          )}
        >
          <link.icon
            className={twMerge(
              "h-4 w-4 flex-shrink-0",
              isActive(link.href) && "text-sky-500"
            )}
          />
          <span>{link.title}</span>
        </Link>
      ))}
      </div>
    );
  }
