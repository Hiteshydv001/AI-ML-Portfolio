import { Icon } from "@tabler/icons-react";

export interface NavLink {
  title: string;
  href: string;
  icon: Icon;
  download?: boolean;
}
