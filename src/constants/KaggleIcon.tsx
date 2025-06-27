import { SVGProps } from "react";

export function IconBrandKaggle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 4h4v16H4z" />
      <path d="M12 4h4l4 8-4 8h-4l4-8z" />
    </svg>
  );
} 