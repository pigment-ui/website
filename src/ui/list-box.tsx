"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  Collection,
  composeRenderProps,
  Header,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps,
  ListBoxProps,
  Section,
  SectionProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { ColorProps, ContentProps, ForwardRefType, SizeProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { cardStyles } from "./card";

// styles

const listBoxStyles = tv({
  variants: {
    isCard: { true: cardStyles().base({ className: "p-2", hasShadow: false }) },
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
      info: "bg-info-500 text-info-500",
      success: "bg-success-500 text-success-500",
      warning: "text-warning-500",
      error: "bg-error-500 text-error-500",
    },
    size: {
      sm: "text-xs p-1 gap-x-1 [&_svg]:size-3",
      md: "text-sm p-2 gap-x-2 [&_svg]:size-4",
      lg: "text-base p-3 gap-x-3 [&_svg]:size-5",
    },
    isSelectable: { true: "cursor-pointer" },
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

interface PigmentListBoxProps<T extends object> extends ListBoxProps<T>, ColorProps, SizeProps {
  isCard?: boolean;
  itemStartContent?: PigmentListBoxItemProps["startContent"];
  itemEndContent?: PigmentListBoxItemProps["endContent"];
  itemClassNames?: PigmentListBoxItemProps["classNames"];
  itemStyles?: PigmentListBoxItemProps["styles"];
  sectionClassNames?: PigmentListBoxSectionProps<T>["classNames"];
  sectionStyles?: PigmentListBoxSectionProps<T>["styles"];
}

interface PigmentListBoxItemProps extends ListBoxItemProps, ColorProps, ContentProps, StyleSlotsToStyleProps<ListBoxItemStylesReturnType> {}

interface PigmentListBoxSectionProps<T extends object> extends SectionProps<T>, StyleSlotsToStyleProps<ListBoxSectionStylesReturnType> {
  title: string;
}

// slots

interface ListBoxSlotsType
  extends Pick<
    PigmentListBoxProps<any>,
    "color" | "size" | "itemStartContent" | "itemEndContent" | "itemClassNames" | "itemStyles" | "sectionClassNames" | "sectionStyles"
  > {}

const [ListBoxSlotsProvider, useListBoxSlots] = createSlots<ListBoxSlotsType>();

// component

function _ListBox<T extends object>(props: PigmentListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    isCard = true,
    color = "default",
    size = "md",
    itemStartContent,
    itemEndContent,
    itemClassNames,
    itemStyles,
    sectionClassNames,
    sectionStyles,
  } = props;

  return (
    <ListBoxSlotsProvider value={{ color, size, itemStartContent, itemEndContent, itemClassNames, itemStyles, sectionClassNames, sectionStyles }}>
      <AriaListBox
        ref={ref}
        {...props}
        className={composeRenderProps(props.className, (className, { isFocusVisible }) => listBoxStyles({ isCard, isFocusVisible, className }))}
      />
    </ListBoxSlotsProvider>
  );
}

const ListBox = (forwardRef as ForwardRefType)(_ListBox);

function _ListBoxItem(props: PigmentListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color, size, startContent, itemStartContent, endContent, itemEndContent, classNames, itemClassNames, styles, itemStyles } =
    useListBoxSlots(props);

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
          {startContent ?? itemStartContent}
          <div
            className={styleSlots.content({ className: twMerge(itemClassNames?.content, classNames?.content) })}
            style={mergeProps(itemStyles?.content, styles?.content)}
          >
            {children}
          </div>
          {isSelected && <CheckIcon />}
          {endContent ?? itemEndContent}
        </>
      ))}
    </AriaListBoxItem>
  );
}

const ListBoxItem = forwardRef(_ListBoxItem);

function _ListBoxSection<T extends object>(props: PigmentListBoxSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
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
export type { PigmentListBoxProps, PigmentListBoxItemProps, PigmentListBoxSectionProps, ListBoxSlotsType };

export const filterInlineListBoxProps = (props: any) => ({
  isCard: false,
  children: props.children,
  color: props.color,
  size: props.size,
  itemStartContent: props.itemStartContent,
  itemEndContent: props.itemEndContent,
  itemClassNames: props.itemClassNames,
  itemStyles: props.itemStyles,
  sectionClassNames: props.sectionClassNames,
  sectionStyles: props.sectionStyles,
});
