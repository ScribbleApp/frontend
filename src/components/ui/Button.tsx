import { forwardRef, type ReactNode, type ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const button = cva("", {
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

interface ButtonProps
  extends ComponentProps<"button">,
    VariantProps<typeof button> {
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, intent, padding, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        className={button({ intent, padding, className })}
      >
        {children}
      </button>
    );
  }
);
