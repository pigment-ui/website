"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { ListBox as AriaListBox, ListBoxItem as AriaListBoxItem, ListBoxItemProps, ListBoxProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { ColorProps, ContentProps, FilterProps, ForwardRefType, StylesSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Card } from "./card";

// styles

const listBoxStyles = tv({
  base: "p-2",
});

const listBoxItemStyles = tv({
  slots: {
    base: "flex items-center gap-x-2 p-2 text-sm [&_svg]:h-4 [&_svg]:w-4 cursor-pointer rounded-lg",
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
    isHovered: {
      true: "bg-opacity-20",
      false: "bg-opacity-0",
    },
    isPressed: {
      true: "bg-opacity-40",
    },
  },
});

type ListBoxItemStylesReturnType = ReturnType<typeof listBoxItemStyles>;

// props

interface PigmentListBoxProps<T extends object> extends FilterProps<ListBoxProps<T>>, ColorProps {
  itemClassNames?: PigmentListBoxItemProps["classNames"];
  itemStyles?: PigmentListBoxItemProps["styles"];
}

interface PigmentListBoxItemProps
  extends FilterProps<ListBoxItemProps>,
    ColorProps,
    ContentProps,
    StylesSlotsToStyleProps<ListBoxItemStylesReturnType> {}

// slots

interface ListBoxSlotsType extends Pick<PigmentListBoxProps<any>, "color" | "itemClassNames" | "itemStyles"> {}

const [ListBoxSlotsProvider, useListBoxSlots] = createSlots<ListBoxSlotsType>();

// component

function _ListBox<T extends object>(props: PigmentListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { color, children, className, itemClassNames, style, itemStyles, ...restProps } = props;

  return (
    <ListBoxSlotsProvider value={{ color, itemClassNames, itemStyles }}>
      <Card asChild className={listBoxStyles({ className })} style={style}>
        <AriaListBox ref={ref} {...restProps}>
          {children}
        </AriaListBox>
      </Card>
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
    ...restProps
  } = useListBoxSlots(props);

  const stylesSlots = listBoxItemStyles({ color });

  return (
    <AriaListBoxItem
      // @ts-ignore
      shouldSelectOnPressUp
      ref={ref}
      {...restProps}
      className={({ isHovered, isPressed, isDisabled, isFocusVisible }) =>
        stylesSlots.base({
          isHovered,
          isPressed,
          isDisabled,
          isFocusVisible,
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

// exports

export { ListBox, ListBoxItem };
export type { PigmentListBoxProps, PigmentListBoxItemProps };
