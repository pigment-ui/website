"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuItemProps, MenuProps, Popover, PopoverProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { ColorProps, ContentProps, FilterProps, ForwardRefType, StylesSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Card } from "./card";

// styles

const menuStyles = tv({
  base: "p-2 outline-none",
});

const menuItemStyles = tv({
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

type MenuItemStylesReturnType = ReturnType<typeof menuItemStyles>;

// props

interface PigmentMenuProps<T extends object>
  extends FilterProps<MenuProps<T>>,
    Pick<PopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip">,
    ColorProps {
  itemClassNames?: PigmentMenuItemProps["classNames"];
  itemStyles?: PigmentMenuItemProps["styles"];
}

interface PigmentMenuItemProps extends FilterProps<MenuItemProps>, ColorProps, ContentProps, StylesSlotsToStyleProps<MenuItemStylesReturnType> {}

// slots

interface MenuSlotsType extends Pick<PigmentMenuProps<any>, "color" | "itemClassNames" | "itemStyles"> {}

const [MenuSlotsProvider, useMenuSlots] = createSlots<MenuSlotsType>();

// component

function _Menu<T extends object>(props: PigmentMenuProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { color, className, itemClassNames, style, itemStyles } = props;

  return (
    <MenuSlotsProvider value={{ color, itemClassNames, itemStyles }}>
      <Popover placement={props.placement} offset={props.offset} crossOffset={props.crossOffset} shouldFlip={props.shouldFlip}>
        <Card asChild className={menuStyles({ className })} style={style}>
          <AriaMenu ref={ref} {...props} className="" style={{}}>
            {props.children}
          </AriaMenu>
        </Card>
      </Popover>
    </MenuSlotsProvider>
  );
}

const Menu = (forwardRef as ForwardRefType)(_Menu);

function _MenuItem(props: PigmentMenuItemProps, ref: ForwardedRef<HTMLDivElement>) {
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
  } = useMenuSlots(props);

  const stylesSlots = menuItemStyles({ color });

  return (
    <AriaMenuItem
      // @ts-ignore
      shouldSelectOnPressUp
      ref={ref}
      id={typeof children === "string" ? children : undefined}
      {...restProps}
      className={({ isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        stylesSlots.base({
          isSelectable: selectionMode !== "none",
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
    </AriaMenuItem>
  );
}

const MenuItem = forwardRef(_MenuItem);

// exports

export { Menu, MenuItem };
export type { PigmentMenuProps, PigmentMenuItemProps };
