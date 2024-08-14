"use client";

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
import { ForwardedRef, forwardRef, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { ChevronDown } from "lucide-react";

import { ContentProps, SizeProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

// styles

const accordionStyles = tv({
  slots: {
    base: "",
    item: "border-b border-default-1000/20 first:border-t",
    trigger: [
      "flex flex-1 items-center [&[data-state=open]>svg.chevron]:rotate-180",
      "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-default-1000 focus-visible:z-10",
      "disabled:opacity-50 disabled:cursor-not-allowed",
    ],
    textWrapper: "flex-1 text-start",
    title: "",
    subtitle: "text-default-500",
    content: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden",
    chevron: "chevron duration-300",
  },
  variants: {
    size: {
      sm: { trigger: "py-4 [&_svg]:size-4 gap-x-2", title: "text-sm", subtitle: "text-xs", content: "text-sm [&>div]:pb-4" },
      md: { trigger: "py-5 [&_svg]:size-5 gap-x-2.5", title: "text-base", subtitle: "text-sm", content: "text-base [&>div]:pb-5" },
      lg: { trigger: "py-6 [&_svg]:size-6 gap-x-3", title: "text-lg", subtitle: "text-base", content: "text-lg [&>div]:pb-6" },
    },
  },
});

type AccordionStylesReturnType = ReturnType<typeof accordionStyles>;

// props

type AccordionProps = (RadixAccordionSingleProps | RadixAccordionMultipleProps) & SizeProps & StyleSlotsToStyleProps<AccordionStylesReturnType>;

type AccordionItemProps = RadixAccordionItemProps &
  ContentProps & {
    title: ReactNode;
    subtitle?: ReactNode;
    children: ReactNode;
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
        className={styleSlots.base({ className: twMerge(classNames?.base, className) })}
        style={mergeProps(styles?.base, style)}
        {...props}
      />
    </AccordionSlotsProvider>
  );
}

const Accordion = forwardRef(_Accordion);

function _AccordionItem(props: AccordionItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { title, subtitle, startContent, endContent, children, styleSlots, className, classNames, style, styles, ...restProps } =
    useAccordionSlots(props);

  return (
    <RadixAccordionItem
      ref={ref}
      className={styleSlots.item({ className: twMerge(classNames?.item, className) })}
      style={mergeProps(styles?.item, style)}
      {...restProps}
    >
      <RadixAccordionHeader className="flex">
        <RadixAccordionTrigger className={styleSlots.trigger({ className: classNames?.trigger })} style={styles?.trigger}>
          {startContent}
          <div className={styleSlots.textWrapper({ className: classNames?.textWrapper })} style={styles?.textWrapper}>
            <div className={styleSlots.title({ className: classNames?.title })} style={styles?.title}>
              {title}
            </div>
            {subtitle && (
              <div className={styleSlots.subtitle({ className: classNames?.subtitle })} style={styles?.subtitle}>
                {subtitle}
              </div>
            )}
          </div>
          {endContent}
          <ChevronDown aria-hidden className={styleSlots.chevron({ className: classNames?.chevron })} style={styles?.chevron} />
        </RadixAccordionTrigger>
      </RadixAccordionHeader>
      <RadixAccordionContent className={styleSlots.content({ className: classNames?.content })} style={styles?.content}>
        <div>{children}</div>
      </RadixAccordionContent>
    </RadixAccordionItem>
  );
}

const AccordionItem = forwardRef(_AccordionItem);

export { Accordion, AccordionItem };
export type { AccordionProps, AccordionItemProps };
