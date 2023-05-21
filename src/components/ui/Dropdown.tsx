import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";

interface DropdownProps {
  icon?: ReactNode;
  title?: string;
}

export const Dropdown = ({ icon, title }: DropdownProps) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center space-x-1 text-neutral-500 outline-none hover:text-neutral-700"
          aria-label="profile options"
        >
          {title && <span>{title}</span>}
          {icon && icon}
          <ChevronDown size={16} />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content className="m-2 w-64 border border-neutral-500 bg-white p-2">
          <DropdownMenu.Item className="border-b border-neutral-500 pb-1">
            item
          </DropdownMenu.Item>
          <DropdownMenu.Item>item</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
