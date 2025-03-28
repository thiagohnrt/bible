"use client";

import { cn } from "@/lib/shad";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import * as React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

const DialogRoot = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

interface DialogProps extends DialogPrimitive.DialogProps {
  id: string;
  onOpen?: () => void;
  onClose?: () => void;
}
const Dialog = React.forwardRef<HTMLDivElement, DialogProps>(
  ({ id, open, onOpen, onClose, children, ...props }: DialogProps, ref) => {
    const [lifeCycle, setLifeCycle] = React.useState<"built" | "open" | "closed">("built");
    const [isOpen, setIsOpen] = React.useState(false);
    const router = useRouter();

    const onHashChange = React.useCallback(
      (event: HashChangeEvent) => {
        const newHash = new URL(event.newURL).hash;
        const isClose = !newHash.includes(id);
        if (isClose) {
          setIsOpen(false);
          window.removeEventListener("hashchange", onHashChange);
        }
      },
      [id]
    );

    const handleOpenChange = React.useCallback(
      (open: boolean) => {
        setIsOpen(open);
        if (open) {
          router.push(window.location.pathname + window.location.search + window.location.hash + "#" + id);
          window.addEventListener("hashchange", onHashChange);
          // if (window.location.hash.split("#").includes(id))
        } else {
          lifeCycle === "open" && router.back();
          window.removeEventListener("hashchange", onHashChange);
        }
      },
      [id, lifeCycle, onHashChange, router]
    );

    React.useEffect(() => {
      if (open !== undefined) {
        handleOpenChange(open);
      }
    }, [handleOpenChange, open]);

    React.useEffect(() => {
      if (isOpen && lifeCycle !== "open") {
        setLifeCycle("open");
        onOpen?.();
      } else if (!isOpen && lifeCycle === "open") {
        setLifeCycle("closed");
        onClose?.();
      }
    }, [isOpen, lifeCycle, onClose, onOpen]);

    React.useEffect(() => {
      return () => {
        window.removeEventListener("hashchange", onHashChange);
      };
    }, [id, onHashChange]);

    return (
      <DialogPrimitive.Root key={id} open={isOpen} onOpenChange={handleOpenChange} {...props}>
        {children}
      </DialogPrimitive.Root>
    );
  }
);
Dialog.displayName = DialogPrimitive.Dialog.displayName;

const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid translate-x-[-50%] translate-y-[-50%] gap-4 bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="hidden sm:block absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50">
        <Cross2Icon className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col space-y-1.5 text-left", className)} {...props} />
);
DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className)} {...props} />
);
DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, children, ...props }, ref) => {
  const router = useRouter();
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight ml-6 sm:ml-0", className)}
      {...props}
    >
      <div
        onClick={router.back}
        className="sm:hidden block absolute px-4 py-6 left-0 top-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground z-50"
      >
        <HiArrowNarrowLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </div>
      {children}
    </DialogPrimitive.Title>
  );
});
DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
};
