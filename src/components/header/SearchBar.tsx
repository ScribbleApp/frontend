import type { ReactNode, ComponentProps } from "react";
import cn from "classnames";

interface SearchBarProps extends ComponentProps<"form"> {
  placeholder: string;
  icon?: ReactNode;
}

export const SearchBar = ({
  placeholder,
  icon,
  className,
  ...rest
}: SearchBarProps) => {
  return (
    <form
      {...rest}
      className={cn(
        "flex h-10 w-64 items-center space-x-2 rounded-full bg-neutral-100 p-2",
        className
      )}
    >
      {icon}
      <input
        type="text"
        placeholder={placeholder}
        className="w-full bg-transparent text-neutral-500 outline-none"
      />
    </form>
  );
};
