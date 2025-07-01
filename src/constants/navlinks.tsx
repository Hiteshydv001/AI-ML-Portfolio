import {
  IconArticle,
  IconBolt,
  IconBriefcase2,
  IconMail,
  IconMessage2,
  IconCertificate,
  IconHome2,
  IconUser,
  IconHome,
  IconBriefcase,
  IconCode,
  IconPencil,
  IconHeart,
  IconFileText,
  IconMessage,
} from "@tabler/icons-react";
import { NavLink } from "@/types/navlink";

export const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
    icon: IconHome,
  },
  {
    title: "About",
    href: "/about",
    icon: IconUser,
  },
  {
    title: "Experience",
    href: "/experience",
    icon: IconBriefcase,
  },
  {
    title: "Projects",
    href: "/projects",
    icon: IconCode,
  },
  {
    title: "Blog",
    href: "/blog",
    icon: IconPencil,
  },
  {
    title: "Volunteer",
    href: "/volunteer",
    icon: IconHeart,
  },
  {
    title: "Resume",
    href: "/resume.pdf",
    icon: IconFileText,
    download: true,
  },
  {
    title: "Contact",
    href: "/contact",
    icon: IconMessage,
  },
];
