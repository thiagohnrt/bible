"use client";

import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster"
      toastOptions={{
        classNames: {
          toast: "toast text-base gap-3 bg-neutral-950 dark:bg-neutral-100",
          title: "font-normal font text-neutral-50 dark:text-neutral-950",
          actionButton: "action-button font-semibold dark:text-neutral-950",
        },
      }}
      {...props}
    />
  );
};
