import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "./Button";

import { useNavigate } from "react-router-dom";

import { useMutation } from "@tanstack/react-query";
import { signOut } from "../../api";

import { UserContext } from "../../context/userContext";
import { useContext } from "react";

interface DropdownProps {
  icon?: ReactNode;
  title?: string;
}

export const Dropdown = ({ icon, title }: DropdownProps) => {
  const { updateIsLoggedIn, userId } = useContext(UserContext);
  const navigate = useNavigate();
  const { isLoading, mutate } = useMutation({
    mutationFn: async () => await signOut(),
    onSuccess(data) {
      console.log(data);
      updateIsLoggedIn(false);
    },
  });

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
        <DropdownMenu.Content className="relative z-50 m-2 flex w-64 flex-col space-y-2 border border-neutral-500 bg-white p-2">
          <DropdownMenu.Item asChild className="text-start outline-none">
            <Button
              intent={"secondary"}
              padding={"none"}
              onClick={() => navigate("/users/" + userId)}
            >
              my profile
            </Button>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild className="text-start outline-none ">
            <Button
              intent={"secondary"}
              padding={"none"}
              onClick={() => mutate()}
            >
              sign out
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
