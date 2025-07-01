import { NavLink } from "@/types/navlink";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconMail,
} from "@tabler/icons-react";
import { IconBrandKaggle } from "./KaggleIcon";

export const socials: NavLink[] = [
  {
    title: "Email",
    href: "mailto:hiteshofficial0001@gmail.com",
    icon: IconMail,
  },
  {
    title: "GitHub",
    href: "https://github.com/Hiteshydv001",
    icon: IconBrandGithub,
  },
  {
    title: "LinkedIn",
    href: "https://www.linkedin.com/in/hitesh-kumar-yadav-8434b4225/",
    icon: IconBrandLinkedin,
  },
  {
    title: "Twitter",
    href: "https://twitter.com/hiteshyadav001",
    icon: IconBrandTwitter,
  },
  {
    title: "Kaggle",
    href: "https://www.kaggle.com/hiteshkumar001",
    icon: IconBrandKaggle,
  },
];