import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./Button";
import type { ReactNode, MouseEvent } from "react";
import { X } from "lucide-react";

interface PopUpProps {
  button: ReactNode;
  popUpTitle: string;
  children: ReactNode;
  onClose: () => void;
}

export const PopUp = ({
  popUpTitle,
  children,
  button,
  onClose,
}: PopUpProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{button}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-neutral-900/50" />
        <Dialog.Content className="fixed  left-1/2 top-1/4 z-50 w-1/2 max-w-sm -translate-x-1/2 bg-white p-4">
          <Dialog.Title className="mb-5 text-xl font-medium">
            {popUpTitle}
          </Dialog.Title>
          {children}
          <Dialog.Close
            asChild
            className="absolute right-4 top-5"
            onClick={() => onClose()}
          >
            <button>
              <X size={16} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
