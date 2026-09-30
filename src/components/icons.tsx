import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function SearchIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export function CartIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M2 3h2.2l2.1 12.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H5.3" />
    </svg>
  );
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5 12h14" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2m2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M10 11v6M14 11v6" />
    </svg>
  );
}

export function TruckIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M10 17V5a1 1 0 0 0-1-1H2v13h1" />
      <path d="M14 17h-4M20 17h1v-4l-3-4h-4v8h1" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  );
}

export function ChatIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-8.5 8.5 8.5 8.5 0 0 1-3.8-.9L3 21l1.9-5.7a8.5 8.5 0 0 1-.9-3.8A8.38 8.38 0 0 1 12.5 3a8.38 8.38 0 0 1 8.5 8.5Z" />
    </svg>
  );
}

export function FishIcon(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 12s3-5 9-5 9 5 9 5-3 5-9 5-9-5-9-5Z" />
      <path d="M20 12c1 0 2 .7 2 2s-1 2-2 2M22 8c-1 0-2 .7-2 2" />
      <circle cx="8" cy="11" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}
