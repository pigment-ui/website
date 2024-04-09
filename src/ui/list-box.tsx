"use client";

import { Slot } from "@radix-ui/react-slot";
import { CheckIcon } from "@radix-ui/react-icons";
import { cloneElement, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  Collection,
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
import { ChildrenProps, ColorProps, ContentProps, FilterProps, ForwardRefType, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Card } from "./card";
import { PigmentFieldBaseProps } from "./field";

// styles

const listBoxStyles = tv({
  base: "outline-none",
  variants: {
    isCard: { true: "p-2" },
  },
});

const listBoxItemStyles = tv({
  slots: {
    base: "flex items-center rounded-lg",
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
    isSelectable: { true: "cursor-pointer", false: "cursor-default" },
    isHovered: { true: "bg-opacity-10", false: "bg-opacity-0" },
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

interface PigmentListBoxProps<T extends object> extends FilterProps<ListBoxProps<T>>, PigmentFieldBaseProps, ColorProps {
  isCard?: boolean;
  itemClassNames?: PigmentListBoxItemProps["classNames"];
  sectionClassNames?: PigmentListBoxSectionProps<T>["classNames"];
  itemStyles?: PigmentListBoxItemProps["styles"];
  sectionStyles?: PigmentListBoxSectionProps<T>["styles"];
}

interface PigmentListBoxItemProps
  extends FilterProps<ListBoxItemProps>,
    ColorProps,
    ContentProps,
    StyleSlotsToStyleProps<ListBoxItemStylesReturnType> {}

interface PigmentListBoxSectionProps<T extends object> extends SectionProps<T>, StyleSlotsToStyleProps<ListBoxSectionStylesReturnType> {
  title: string;
}

// slots

interface ListBoxSlotsType
  extends Pick<PigmentListBoxProps<any>, "color" | "size" | "itemClassNames" | "sectionClassNames" | "itemStyles" | "sectionStyles"> {}

const [ListBoxSlotsProvider, useListBoxSlots] = createSlots<ListBoxSlotsType>();

// component

function _ListBox<T extends object>(props: PigmentListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { isCard = true, color, size = "md", children, itemClassNames, sectionClassNames, itemStyles, sectionStyles } = props;

  const Component = ({ children }: ChildrenProps) =>
    cloneElement(isCard ? <Card asChild hasShadow={false} /> : <Slot />, { children, className: listBoxStyles({ isCard }) });

  return (
    <ListBoxSlotsProvider value={{ color, size, itemClassNames, sectionClassNames, itemStyles, sectionStyles }}>
      <Component>
        <AriaListBox ref={ref} {...props}>
          {children}
        </AriaListBox>
      </Component>
    </ListBoxSlotsProvider>
  );
}

const ListBox = (forwardRef as ForwardRefType)(_ListBox);

function _ListBoxItem(props: PigmentListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    color = "default",
    size,
    startContent,
    endContent,
    children,
    className,
    classNames,
    itemClassNames,
    style,
    styles,
    itemStyles,
  } = useListBoxSlots(props);

  const styleSlots = listBoxItemStyles({ color, size });

  return (
    <AriaListBoxItem
      ref={ref}
      id={typeof children === "string" ? children : undefined}
      textValue={typeof children === "string" ? children : undefined}
      {...props}
      className={({ isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        styleSlots.base({
          isHovered,
          isPressed,
          isDisabled,
          isFocusVisible,
          isSelectable: selectionMode !== "none",
          className: twMerge(itemClassNames?.base, classNames?.base, className),
        })
      }
      style={mergeProps(itemStyles?.base, styles?.base, style)}
    >
      {({ isSelected }) => (
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
      )}
    </AriaListBoxItem>
  );
}

const ListBoxItem = forwardRef(_ListBoxItem);

function _ListBoxSection<T extends object>(props: PigmentListBoxSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { title, items, size, children, className, classNames, sectionClassNames, style, styles, sectionStyles } = useListBoxSlots(props);

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

export { ListBox, ListBoxItem, ListBoxSection };
export type { PigmentListBoxProps, PigmentListBoxItemProps, PigmentListBoxSectionProps };
