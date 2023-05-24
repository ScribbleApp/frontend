import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Link, type LinkProps } from "react-router-dom";

const link = cva("font-medium", {
  variants: {
    intent: {
      primary: [
        "bg-neutral-800",
        "text-white",
        "rounded-full",
        "hover:bg-neutral-700",
      ],
      secondary: [
        "bg-transparent",
        "text-neutral-500",
        "hover:text-neutral-700",
      ],
    },
    padding: {
      none: ["p-0"],
      small: ["px-4 py-2"],
    },
  },
  defaultVariants: {
    intent: "primary",
    padding: "small",
  },
});

interface NavLinkProps extends LinkProps, VariantProps<typeof link> {
  children: ReactNode;
}

export const NavLink = ({
  children,
  className,
  intent,
  ...rest
}: NavLinkProps) => {
  return (
    <Link {...rest} className={link({ intent, className })}>
      {children}
    </Link>
  );
};
