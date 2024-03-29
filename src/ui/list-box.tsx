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
import { ChildrenProps, ColorProps, ContentProps, FilterProps, ForwardRefType, StylesSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Card } from "./card";
import { Field, PigmentFieldBaseProps } from "./field";

// styles

const listBoxStyles = tv({
  base: "outline-none",
  variants: {
    isCard: { true: "p-2" },
  },
});

const listBoxItemStyles = tv({
  slots: {
    base: "flex items-center gap-x-2 p-2 text-sm [&_svg]:h-4 [&_svg]:w-4 rounded-lg",
    content: "flex-1",
  },
  variants: {
    ...isDisabledVariants,
    ...isFocusVisibleVariants,
    color: {
      default: "bg-default-1000 text-default-1000",
      info: "bg-info-500 text-info-500",
      success: "bg-success-500 text-success-500",
      warning: "text-warning-500",
      error: "bg-error-500 text-error-500",
    },
    isSelectable: { true: "cursor-pointer", false: "cursor-default" },
    isHovered: { true: "bg-opacity-10", false: "bg-opacity-0" },
    isPressed: { true: "bg-opacity-20" },
  },
});

type ListBoxItemStylesReturnType = ReturnType<typeof listBoxItemStyles>;

const listBoxSectionStyles = tv({
  slots: {
    base: "py-2 first:pt-0 last:pb-0",
    title: "p-2 mb-2 text-sm text-default-500 font-bold border-b border-b-default-1000/20",
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
    StylesSlotsToStyleProps<ListBoxItemStylesReturnType> {}

interface PigmentListBoxSectionProps<T extends object> extends SectionProps<T>, StylesSlotsToStyleProps<ListBoxSectionStylesReturnType> {
  title: string;
}

// slots

interface ListBoxSlotsType
  extends Pick<PigmentListBoxProps<any>, "color" | "itemClassNames" | "sectionClassNames" | "itemStyles" | "sectionStyles"> {}

const [ListBoxSlotsProvider, useListBoxSlots] = createSlots<ListBoxSlotsType>();

// component

function _ListBox<T extends object>(props: PigmentListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { isCard = true, color, children, itemClassNames, sectionClassNames, itemStyles, sectionStyles } = props;

  const Component = ({ children }: ChildrenProps) =>
    cloneElement(isCard ? <Card asChild hasShadow={false} /> : <Slot />, { children, className: listBoxStyles({ isCard }) });

  return (
    <ListBoxSlotsProvider value={{ color, itemClassNames, sectionClassNames, itemStyles, sectionStyles }}>
      <Field {...props}>
        <Component>
          <AriaListBox ref={ref} {...props} className="" style={{}}>
            {children}
          </AriaListBox>
        </Component>
      </Field>
    </ListBoxSlotsProvider>
  );
}

const ListBox = (forwardRef as ForwardRefType)(_ListBox);

function _ListBoxItem(props: PigmentListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    color = "default",
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

  const stylesSlots = listBoxItemStyles({ color });

  return (
    <AriaListBoxItem
      // @ts-ignore
      shouldSelectOnPressUp
      ref={ref}
      textValue={typeof children === "string" ? children : undefined}
      {...props}
      className={({ isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        stylesSlots.base({
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
            className={stylesSlots.content({ className: twMerge(itemClassNames?.content, classNames?.content) })}
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
  const { title, items, children, className, classNames, sectionClassNames, style, styles, sectionStyles } = useListBoxSlots(props);

  const stylesSlots = listBoxSectionStyles();

  return (
    <Section
      ref={ref}
      className={stylesSlots.base({ className: twMerge(sectionClassNames?.base, classNames?.base, className) })}
      style={mergeProps(sectionStyles?.base, styles?.base, style)}
    >
      <Header
        className={stylesSlots.title({ className: twMerge(sectionClassNames?.title, classNames?.title) })}
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
