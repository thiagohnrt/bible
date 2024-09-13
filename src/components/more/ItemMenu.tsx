import React, { forwardRef } from "react";

export const ItemMenu = forwardRef<
  HTMLDivElement,
  {
    label: string;
    icon?: React.ReactNode;
    children?: React.ReactNode;
    onClick?: () => void;
  }
>(({ label, icon, children, ...props }, ref) => {
  return (
    <div
      className="flex items-center justify-between gap-2 px-6 py-5 active:bg-neutral-100 dark:active:bg-neutral-900 transition-colors"
      ref={ref}
      {...props}
    >
      <div className="flex flex-col">
        <div>{label}</div>
        <div>{children}</div>
      </div>
      <div>{icon}</div>
    </div>
  );
});

ItemMenu.displayName = "ItemMenu";
