import { TablerIconsProps } from "@tabler/icons-react";

export interface NavLink {
  title: string;
  href: string;
  icon?: React.ReactNode | TablerIconsProps | any;
}
