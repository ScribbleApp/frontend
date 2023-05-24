import type { ComponentProps, ReactNode } from "react";
import cn from "classnames";

interface ContainerProps extends ComponentProps<"div"> {
  children: ReactNode;
}

export const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div {...rest} className={cn("container mx-auto", className)}>
      {children}
    </div>
  );
};
