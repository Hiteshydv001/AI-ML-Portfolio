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
        className="fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-lg bg-white shadow-md border border-gray-200/60 lg:hidden focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
        onClick={() => setOpen(true)}
        aria-label={open ? "Close sidebar" : "Open sidebar"}
        style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.05)' }}
      >
        <IconLayoutSidebarRightCollapse className="w-5 h-5 text-gray-700" strokeWidth={1.5} />
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
              <div className="h-full px-6 py-8 overflow-y-auto flex flex-col no-scrollbar">
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
        <div className="h-full px-6 py-8 overflow-y-auto flex flex-col no-scrollbar">
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
