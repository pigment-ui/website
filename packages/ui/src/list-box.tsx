"use client";

import { cardStyles } from "./card";
import { isFocusVisibleVariants, smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ContentProps, ForwardRefType, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { createSlots } from "./utils";
import { CheckIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  Collection,
  composeRenderProps,
  Header,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
  ListBoxSection as AriaListBoxSection,
  SectionProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const listBoxStyles = tv({
  variants: {
    asCard: { true: cardStyles().base({ className: "p-2", hasShadow: false }) },
    isFocusVisible: isFocusVisibleVariants,
  },
});

const listBoxItemStyles = tv({
  extend: variantColorStyles,
  base: ["!scale-100 !backdrop-blur-none", smallRadiusVariants.md],
  slots: {
    content: "flex-1",
  },
  variants: {
    size: {
      sm: "mt-0.5 gap-x-1 p-1 text-xs [&_svg]:size-3",
      md: "mt-1 gap-x-2 p-2 text-sm [&_svg]:size-4",
      lg: "mt-1.5 gap-x-3 p-3 text-base [&_svg]:size-5",
    },
    isSelectable: {
      true: "cursor-pointer",
      false: "cursor-default",
    },
  },
});

type ListBoxItemStylesReturnType = ReturnType<typeof listBoxItemStyles>;

const listBoxSectionStyles = tv({
  slots: {
    base: "first:pt-0 last:pb-0",
    title: "border-b border-b-default-1000/20 font-bold text-default-500",
  },
  variants: {
    size: {
      sm: { base: "py-1", title: "mb-1 p-1 text-xs" },
      md: { base: "py-2", title: "mb-2 p-2 text-sm" },
      lg: { base: "py-3", title: "mb-3 p-3 text-base" },
    },
  },
});

type ListBoxSectionStylesReturnType = ReturnType<typeof listBoxSectionStyles>;

// props

interface ListBoxProps<T extends object> extends AriaListBoxProps<T>, VariantProps, ColorProps, SizeProps {
  asCard?: boolean;
  itemClassNames?: ListBoxItemProps["classNames"];
  itemStyles?: ListBoxItemProps["styles"];
  sectionClassNames?: ListBoxSectionProps<T>["classNames"];
  sectionStyles?: ListBoxSectionProps<T>["styles"];
}

interface ListBoxItemProps
  extends AriaListBoxItemProps,
    VariantProps,
    ColorProps,
    ContentProps,
    StyleSlotsToStyleProps<ListBoxItemStylesReturnType> {}

interface ListBoxSectionProps<T extends object> extends SectionProps<T>, StyleSlotsToStyleProps<ListBoxSectionStylesReturnType> {
  title: string;
}

// slots

interface ListBoxSlotsType<T extends object>
  extends Pick<
    ListBoxProps<T>,
    "variant" | "color" | "size" | "itemClassNames" | "itemStyles" | "sectionClassNames" | "sectionStyles" | "items" | "children"
  > {}

const [ListBoxSlotsProvider, useListBoxSlots] = createSlots<ListBoxSlotsType<object>>();

// component

function _ListBox<T extends object>(props: ListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { asCard = true, variant = "solid", color = "default", size = "md", itemClassNames, itemStyles, sectionClassNames, sectionStyles } = props;

  return (
    <ListBoxSlotsProvider value={{ variant, color, size, itemClassNames, itemStyles, sectionClassNames, sectionStyles }}>
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
  const { variant, color, size, startContent, endContent, classNames, itemClassNames, styles, itemStyles } = useListBoxSlots(props);

  const styleSlots = listBoxItemStyles({ color, size });

  return (
    <AriaListBoxItem
      ref={ref}
      id={typeof props.children === "string" ? props.children : undefined}
      textValue={typeof props.children === "string" ? props.children : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, { isHovered, isPressed, isDisabled, isFocusVisible, selectionMode, isSelected }) =>
        styleSlots.base({
          variant: isSelected ? variant : "light",
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
    <AriaListBoxSection
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
    </AriaListBoxSection>
  );
}

const ListBoxSection = (forwardRef as ForwardRefType)(_ListBoxSection);

// exports

export { ListBox, ListBoxItem, ListBoxSection, listBoxItemStyles };
export type { ListBoxItemProps, ListBoxSectionProps, ListBoxSlotsType };

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
