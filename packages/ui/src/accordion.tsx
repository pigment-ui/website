"use client";

import { ContentProps, SizeProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";
import {
  AccordionItemProps as RadixAccordionItemProps,
  AccordionMultipleProps as RadixAccordionMultipleProps,
  AccordionSingleProps as RadixAccordionSingleProps,
  Content as RadixAccordionContent,
  Header as RadixAccordionHeader,
  Item as RadixAccordionItem,
  Root as RadixAccordionRoot,
  Trigger as RadixAccordionTrigger,
} from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const accordionStyles = tv({
  slots: {
    base: "",
    item: "border-b border-default-1000/20 first:border-t",
    trigger: [
      "flex flex-1 items-center [&[data-state=open]>.icon]:rotate-180",
      "outline-none focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-1000",
      "disabled:cursor-not-allowed disabled:opacity-50",
    ],
    textWrapper: "flex-1 text-start",
    title: "",
    description: "text-default-500",
    content: "overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down [&>div]:!pt-0",
    icon: "icon duration-300",
  },
  variants: {
    size: {
      sm: {
        trigger: "gap-x-2 p-4 [&_svg]:size-4",
        title: "text-sm",
        description: "text-xs",
        content: "text-sm [&>div]:p-4",
      },
      md: {
        trigger: "gap-x-2.5 p-5 [&_svg]:size-5",
        title: "text-base",
        description: "text-sm",
        content: "text-base [&>div]:p-5",
      },
      lg: {
        trigger: "gap-x-3 p-6 [&_svg]:size-6",
        title: "text-lg",
        description: "text-base",
        content: "text-lg [&>div]:p-6",
      },
    },
  },
});

type AccordionStylesReturnType = ReturnType<typeof accordionStyles>;

// props

type AccordionProps = (RadixAccordionSingleProps | RadixAccordionMultipleProps) & SizeProps & StyleSlotsToStyleProps<AccordionStylesReturnType>;

type AccordionItemProps = RadixAccordionItemProps &
  ContentProps & {
    title: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    icon?: ReactNode;
  };

// slots

interface AccordionSlotsType extends StyleSlotsToSlots<AccordionStylesReturnType> {}

const [AccordionSlotsProvider, useAccordionSlots] = createSlots<AccordionSlotsType>();

// component

function _Accordion(props: AccordionProps, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", className, classNames, style, styles } = props;

  const styleSlots = accordionStyles({ size });

  return (
    <AccordionSlotsProvider value={{ styleSlots, classNames, styles }}>
      <RadixAccordionRoot
        ref={ref}
        {...props}
        className={styleSlots.base({
          className: twMerge(classNames?.base, className),
        })}
        style={mergeProps(styles?.base, style)}
      />
    </AccordionSlotsProvider>
  );
}

const Accordion = forwardRef(_Accordion);

function _AccordionItem(props: AccordionItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { title, description, startContent, endContent, children, styleSlots, className, classNames, style, styles, icon, ...restProps } =
    useAccordionSlots(props);

  return (
    <RadixAccordionItem
      ref={ref}
      {...restProps}
      className={styleSlots.item({
        className: twMerge(classNames?.item, className),
      })}
      style={mergeProps(styles?.item, style)}
    >
      <RadixAccordionHeader className="flex">
        <RadixAccordionTrigger className={styleSlots.trigger({ className: classNames?.trigger })} style={styles?.trigger}>
          {startContent}

          <div
            className={styleSlots.textWrapper({
              className: classNames?.textWrapper,
            })}
            style={styles?.textWrapper}
          >
            <div className={styleSlots.title({ className: classNames?.title })} style={styles?.title}>
              {title}
            </div>
            {description && (
              <div
                className={styleSlots.description({
                  className: classNames?.description,
                })}
                style={styles?.description}
              >
                {description}
              </div>
            )}
          </div>

          {endContent}

          <div aria-hidden className={styleSlots.icon({ className: classNames?.icon })} style={styles?.icon}>
            {icon ?? <ChevronDown />}
          </div>
        </RadixAccordionTrigger>
      </RadixAccordionHeader>
      <RadixAccordionContent className={styleSlots.content({ className: classNames?.content })} style={styles?.content}>
        <div>{children}</div>
      </RadixAccordionContent>
    </RadixAccordionItem>
  );
}

const AccordionItem = forwardRef(_AccordionItem);

// exports

export { Accordion, AccordionItem };
