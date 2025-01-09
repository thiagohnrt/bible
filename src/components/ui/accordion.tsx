"use client";

import { cn } from "@/lib/shad";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as React from "react";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionItemFocus = React.forwardRef<
  React.ElementRef<typeof AccordionItem>,
  React.ComponentPropsWithoutRef<typeof AccordionItem>
>(({ ...props }, ref) => {
  const localRef = React.useRef<HTMLDivElement | null>(null);

  const setRef = (el: HTMLDivElement | null) => {
    localRef.current = el;
    if (typeof ref === "function") {
      ref(el);
    } else if (ref) {
      ref.current = el;
    }
  };

  const focus = () => {
    const element = localRef.current;
    if (element) {
      setTimeout(() => {
        const headerHeight = 65; // Altura do header fixo
        const itemTop = element.getBoundingClientRect().top;
        const offsetPosition = itemTop + window.scrollY - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        element.focus();
      }, 750);
    }
  };

  return <AccordionItem ref={setRef} onClick={focus} {...props} />;
});
AccordionItemFocus.displayName = "AccordionItemFocus";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-base font-medium transition-all [&[data-state=open]>svg]:rotate-180",
        className
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-base data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionItemFocus, AccordionTrigger };
