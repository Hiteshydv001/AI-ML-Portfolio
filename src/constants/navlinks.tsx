import {
  IconArticle,
  IconBolt,
  IconBriefcase2,
  IconMail,
  IconMessage2,
  IconCertificate,
  IconHome2,
  IconUser,
} from "@tabler/icons-react";
import { NavLink } from "@/types/navlink";

export const navLinks: NavLink[] = [
  {
    title: "Home",
    href: "/",
    icon: IconHome2
  },
  {
    title: "About",
    href: "/about",
    icon: IconUser
  },
  {
    title: "Projects",
    href: "/projects",
    icon: IconBolt
  },
  {
    title: "Experience",
    href: "/experience",
    icon: IconBriefcase2
  },
  {
    title: "Volunteer",
    href: "/volunteer",
    icon: IconCertificate
  },
  {
    title: "Research",
    href: "/blog",
    icon: IconArticle
  },
];
