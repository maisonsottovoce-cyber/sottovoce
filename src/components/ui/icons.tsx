import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { title?: string };

function Base({ title, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      {...props}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export const SearchIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </Base>
);

export const AccountIcon = (p: IconProps) => (
  <Base {...p}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-3.5 3.6-6 8-6s8 2.5 8 6" />
  </Base>
);

export const HeartIcon = (p: IconProps & { filled?: boolean }) => (
  <Base {...p} fill={p.filled ? "currentColor" : "none"}>
    <path d="M12 20s-7-4.6-9.2-9.1C1.3 8 2.6 4.8 5.7 4.8c1.9 0 3.3 1.2 4.3 2.6 1-1.4 2.4-2.6 4.3-2.6 3.1 0 4.4 3.2 2.9 6.1C19 15.4 12 20 12 20Z" />
  </Base>
);

export const BagIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
  </Base>
);

export const MenuIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </Base>
);

export const CloseIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </Base>
);

export const PlusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 5v14M5 12h14" />
  </Base>
);

export const MinusIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M5 12h14" />
  </Base>
);

export const ChevronDownIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="m6 9 6 6 6-6" />
  </Base>
);

export const ArrowRightIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </Base>
);

export const PlayIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M8 5.5v13l11-6.5-11-6.5Z" />
  </Base>
);

export const TruckIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z" />
    <circle cx="7" cy="18" r="1.6" />
    <circle cx="17.5" cy="18" r="1.6" />
  </Base>
);

export const ReturnIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M9 7 5 11l4 4" />
    <path d="M5 11h9a5 5 0 0 1 5 5v1" />
  </Base>
);

export const LockIcon = (p: IconProps) => (
  <Base {...p}>
    <rect x="5" y="10" width="14" height="10" rx="1.5" />
    <path d="M8 10V8a4 4 0 0 1 8 0v2" />
  </Base>
);

export const StylistIcon = (p: IconProps) => (
  <Base {...p}>
    <path d="M12 3v18M7 8l5-5 5 5" />
    <circle cx="12" cy="15" r="3" />
  </Base>
);
