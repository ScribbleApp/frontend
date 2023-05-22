import type { ReactNode, ComponentProps } from "react";
import cn from "classnames";

interface SplitScreenProps extends ComponentProps<"div"> {
  children: ReactNode[];
  rightWeight: number;
  leftWeight: number;
}

export const SplitScreen = ({
  children,
  rightWeight = 1,
  leftWeight = 1,
  className,
  ...rest
}: SplitScreenProps) => {
  const [leftComponent, rightComponent] = children;
  return (
    <div {...rest} className={cn("flex flex-1", className)}>
      <div style={{ flex: leftWeight }}>{leftComponent}</div>
      <div style={{ flex: rightWeight }}>{rightComponent}</div>
    </div>
  );
};
