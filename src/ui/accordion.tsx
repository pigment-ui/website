"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { AccordionItemProps } from "@radix-ui/react-accordion";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { twMerge } from "tailwind-merge";

import { ChevronDown } from "lucide-react";

const Accordion = RadixAccordion.Root;

const AccordionItem = forwardRef<ElementRef<typeof RadixAccordion.Item>, AccordionItemProps>(({ className, ...props }, ref) => (
  <RadixAccordion.Item ref={ref} className={twMerge("border-b", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = forwardRef<ElementRef<typeof RadixAccordion.Trigger>, ComponentPropsWithoutRef<typeof RadixAccordion.Trigger>>(
  ({ className, children, ...props }, ref) => (
    <RadixAccordion.Header className="flex">
      <RadixAccordion.Trigger
        ref={ref}
        className={twMerge(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  ),
);
AccordionTrigger.displayName = RadixAccordion.Trigger.displayName;

const AccordionContent = forwardRef<ElementRef<typeof RadixAccordion.Content>, ComponentPropsWithoutRef<typeof RadixAccordion.Content>>(
  ({ className, children, ...props }, ref) => (
    <RadixAccordion.Content
      ref={ref}
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm transition-all"
      {...props}
    >
      <div className={twMerge("pb-4 pt-0", className)}>{children}</div>
    </RadixAccordion.Content>
  ),
);

AccordionContent.displayName = RadixAccordion.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
