"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  composeRenderProps,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuItemProps,
  MenuProps,
  Popover,
  PopoverProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";

import { ForwardRefType, StyleProps } from "./types";
import { createSlots } from "./utils";
import { listBoxItemStyles, ListBoxSection, ListBoxSlotsType, listBoxStyles, PigmentListBoxItemProps, PigmentListBoxProps } from "./list-box";

// styles

const menuStyles = listBoxStyles;

const menuItemStyles = listBoxItemStyles;

// props

interface PigmentMenuProps<T extends object>
  extends Omit<MenuProps<T>, keyof StyleProps>,
    Omit<PigmentListBoxProps<T>, keyof MenuProps<T> | "isCard">,
    Omit<PopoverProps, keyof Omit<MenuProps<T>, keyof StyleProps>> {}

interface PigmentMenuItemProps extends MenuItemProps, Omit<PigmentListBoxItemProps, keyof MenuItemProps> {}

// slots

const [MenuSlotsProvider, useMenuSlots] = createSlots<ListBoxSlotsType>();

// component

function _Menu<T extends object>(props: PigmentMenuProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", itemStartContent, itemEndContent, itemClassNames, itemStyles, sectionClassNames, sectionStyles } = props;

  return (
    <MenuSlotsProvider value={{ color, size, itemStartContent, itemEndContent, itemClassNames, itemStyles, sectionClassNames, sectionStyles }}>
      <Popover maxHeight={300} {...props} className={composeRenderProps(props.className, (className) => menuStyles({ isCard: true, className }))}>
        <AriaMenu ref={ref} {...props} className="outline-none" style={{}} />
      </Popover>
    </MenuSlotsProvider>
  );
}

const Menu = (forwardRef as ForwardRefType)(_Menu);

function _MenuItem(props: PigmentMenuItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color, size, startContent, itemStartContent, endContent, itemEndContent, classNames, itemClassNames, styles, itemStyles } =
    useMenuSlots(props);

  const styleSlots = menuItemStyles({ color, size });

  return (
    <AriaMenuItem
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
    </AriaMenuItem>
  );
}

const MenuItem = forwardRef(_MenuItem);

const MenuSection = ListBoxSection;

// exports

export { Menu, MenuItem, MenuSection };
export type { PigmentMenuProps, PigmentMenuItemProps };
