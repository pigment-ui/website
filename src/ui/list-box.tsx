"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  Collection,
  composeRenderProps,
  Header,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
  Section,
  SectionProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { CheckIcon } from "lucide-react";

import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { ColorProps, ContentProps, ForwardRefType, SizeProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { cardStyles } from "./card";

// styles

const listBoxStyles = tv({
  variants: {
    asCard: { true: cardStyles().base({ className: "p-2", hasShadow: false }) },
    ...isFocusVisibleVariants,
  },
});

const listBoxItemStyles = tv({
  slots: {
    base: "flex items-center rounded-lg bg-opacity-0",
    content: "flex-1",
  },
  variants: {
    color: {
      default: "bg-default-1000 text-default-1000",
      "default-inverted": "bg-default-0 text-default-0",
      primary: "bg-primary-500 text-primary-500",
      info: "bg-info-500 text-info-500",
      success: "bg-success-500 text-success-500",
      warning: "bg-warning-500 text-warning-500",
      error: "bg-error-500 text-error-500",
    },
    size: {
      sm: "text-xs p-1 gap-x-1 [&_svg]:size-3",
      md: "text-sm p-2 gap-x-2 [&_svg]:size-4",
      lg: "text-base p-3 gap-x-3 [&_svg]:size-5",
    },
    isSelectable: { true: "cursor-pointer", false: "cursor-default" },
    isHovered: { true: "bg-opacity-10" },
    isPressed: { true: "bg-opacity-20" },
    ...isDisabledVariants,
    ...isFocusVisibleVariants,
  },
});

type ListBoxItemStylesReturnType = ReturnType<typeof listBoxItemStyles>;

const listBoxSectionStyles = tv({
  slots: {
    base: "first:pt-0 last:pb-0",
    title: "text-default-500 font-bold border-b border-b-default-1000/20",
  },
  variants: {
    size: {
      sm: { base: "py-1", title: "p-1 mb-1 text-xs" },
      md: { base: "py-2", title: "p-2 mb-2 text-sm" },
      lg: { base: "py-3", title: "p-3 mb-3 text-base" },
    },
  },
});

type ListBoxSectionStylesReturnType = ReturnType<typeof listBoxSectionStyles>;

// props

interface ListBoxProps<T extends object> extends AriaListBoxProps<T>, ColorProps, SizeProps {
  asCard?: boolean;
  itemClassNames?: ListBoxItemProps["classNames"];
  itemStyles?: ListBoxItemProps["styles"];
  sectionClassNames?: ListBoxSectionProps<T>["classNames"];
  sectionStyles?: ListBoxSectionProps<T>["styles"];
}

interface ListBoxItemProps extends AriaListBoxItemProps, ColorProps, ContentProps, StyleSlotsToStyleProps<ListBoxItemStylesReturnType> {}

interface ListBoxSectionProps<T extends object> extends SectionProps<T>, StyleSlotsToStyleProps<ListBoxSectionStylesReturnType> {
  title: string;
}

// slots

interface ListBoxSlotsType<T extends object>
  extends Pick<ListBoxProps<T>, "color" | "size" | "itemClassNames" | "itemStyles" | "sectionClassNames" | "sectionStyles" | "items" | "children"> {}

const [ListBoxSlotsProvider, useListBoxSlots] = createSlots<ListBoxSlotsType<object>>();

// component

function _ListBox<T extends object>(props: ListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { asCard = true, color = "default", size = "md", itemClassNames, itemStyles, sectionClassNames, sectionStyles } = props;

  return (
    <ListBoxSlotsProvider value={{ color, size, itemClassNames, itemStyles, sectionClassNames, sectionStyles }}>
      <AriaListBox
        ref={ref}
        {...props}
        className={composeRenderProps(props.className, (className, { isFocusVisible }) => listBoxStyles({ asCard, isFocusVisible, className }))}
      />
    </ListBoxSlotsProvider>
  );
}

const ListBox = (forwardRef as ForwardRefType)(_ListBox);

function _ListBoxItem(props: ListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color, size, startContent, endContent, classNames, itemClassNames, styles, itemStyles } = useListBoxSlots(props);

  const styleSlots = listBoxItemStyles({ color, size });

  return (
    <AriaListBoxItem
      ref={ref}
      id={typeof props.children === "string" ? props.children : undefined}
      textValue={typeof props.children === "string" ? props.children : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, { isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        styleSlots.base({
          isHovered,
          isPressed,
          isDisabled,
          isFocusVisible,
          isSelectable: selectionMode !== "none",
          className: twMerge(itemClassNames?.base, classNames?.base, className),
        }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.base, styles?.base, style))}
    >
      {composeRenderProps(props.children, (children, { isSelected }) => (
        <>
          {startContent}
          <div
            className={styleSlots.content({ className: twMerge(itemClassNames?.content, classNames?.content) })}
            style={mergeProps(itemStyles?.content, styles?.content)}
          >
            {children}
          </div>
          {isSelected && <CheckIcon />}
          {endContent}
        </>
      ))}
    </AriaListBoxItem>
  );
}

const ListBoxItem = forwardRef(_ListBoxItem);

function _ListBoxSection<T extends object>(props: ListBoxSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { title, items, size, className, classNames, sectionClassNames, style, styles, sectionStyles, children } = useListBoxSlots(props);

  const styleSlots = listBoxSectionStyles({ size });

  return (
    <Section
      ref={ref}
      className={styleSlots.base({ className: twMerge(sectionClassNames?.base, classNames?.base, className) })}
      style={mergeProps(sectionStyles?.base, styles?.base, style)}
    >
      <Header
        className={styleSlots.title({ className: twMerge(sectionClassNames?.title, classNames?.title) })}
        style={mergeProps(sectionStyles?.title, styles?.title)}
      >
        {title}
      </Header>
      <Collection items={items}>{children}</Collection>
    </Section>
  );
}

const ListBoxSection = (forwardRef as ForwardRefType)(_ListBoxSection);

// exports

export { ListBox, ListBoxItem, ListBoxSection, listBoxItemStyles };
export type { ListBoxProps, ListBoxItemProps, ListBoxSectionProps, ListBoxSlotsType };

export const filterInlineListBoxProps = (props: any) => ({
  asCard: false,
  children: props.children,
  items: props.items,
  color: props.color,
  size: props.size,
  itemStartContent: props.itemStartContent,
  itemEndContent: props.itemEndContent,
  itemClassNames: props.itemClassNames,
  itemStyles: props.itemStyles,
  sectionClassNames: props.sectionClassNames,
  sectionStyles: props.sectionStyles,
});
