"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { createContext, ReactNode, useEffect, useRef } from "react";

export const DialogContext = createContext<{
  register: (dialog: DialogProps) => void;
}>({
  register: () => null,
});

export const DIALOG_EVENT = "dialogOpenChange";

interface DialogProps extends DialogPrimitive.DialogProps {
  id: string;
}

export function DialogProvider({ children }: { children: ReactNode }) {
  const dialogsRef = useRef<DialogProps[]>([]);
  const router = useRouter();

  const register = (dialog: DialogProps) => {
    const index = dialogsRef.current.findIndex(({ id }) => id === dialog.id);
    if (index > -1) {
      dialogsRef.current.splice(index, 1, dialog);
    } else {
      dialogsRef.current.push(dialog);
    }
  };

  const getDialogChange = (newHash: string, oldHash: string): { id: string; open: boolean } => {
    if (newHash.includes(oldHash)) {
      return {
        id: newHash.replace(oldHash, "").substring(1),
        open: true,
      };
    } else {
      return {
        id: oldHash.replace(newHash, "").substring(1),
        open: false,
      };
    }
  };

  useEffect(() => {
    const onHashChange = (event: HashChangeEvent) => {
      const newHash = new URL(event.newURL).hash;
      const oldHash = new URL(event.oldURL).hash;
      const dialogChange = getDialogChange(newHash, oldHash);

      const dialog = dialogsRef.current.findLast((dialog) => dialog.id === dialogChange.id);

      dialog && dialog.onOpenChange && dialog.onOpenChange(dialogChange.open);
    };

    const onOpenChange = (event: Event) => {
      const detail = (event as CustomEvent).detail;
      const dialogId = "#" + detail.id;
      if (detail.open) {
        window.location.hash += dialogId;
      } else {
        const hash = window.location.hash.replace(dialogId, "");
        router.replace(window.location.pathname + hash);
      }
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener(DIALOG_EVENT, onOpenChange);

    return () => {
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener(DIALOG_EVENT, onOpenChange);
    };
  }, [router]);

  return <DialogContext.Provider value={{ register }}>{children}</DialogContext.Provider>;
}
