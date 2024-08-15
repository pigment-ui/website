"use client";

import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  composeRenderProps,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuItemProps as AriaMenuItemProps,
  MenuProps as AriaMenuProps,
  Popover,
  PopoverProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { CheckIcon } from "lucide-react";

import { ForwardRefType, StyleProps } from "./types";
import { createSlots } from "./utils";

import { cardStyles } from "./card";
import { ListBox, ListBoxItem, listBoxItemStyles, ListBoxSection, ListBoxSlotsType } from "./list-box";

// styles

const menuStyles = tv({
  base: cardStyles().base({ className: "p-2" }),
});

const menuItemStyles = listBoxItemStyles;

// props

interface MenuProps<T extends object>
  extends Omit<AriaMenuProps<T>, keyof StyleProps>,
    Omit<ComponentPropsWithoutRef<typeof ListBox<T>>, keyof AriaMenuProps<T> | "asCard">,
    Omit<PopoverProps, keyof Omit<AriaMenuProps<T>, keyof StyleProps>> {}

interface MenuItemProps extends AriaMenuItemProps, Omit<ComponentPropsWithoutRef<typeof ListBoxItem>, keyof AriaMenuItemProps> {}

// slots

const [MenuSlotsProvider, useMenuSlots] = createSlots<ListBoxSlotsType<object>>();

// component

function _Menu<T extends object>(props: MenuProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", itemClassNames, itemStyles, sectionClassNames, sectionStyles } = props;

  return (
    <MenuSlotsProvider value={{ color, size, itemClassNames, itemStyles, sectionClassNames, sectionStyles }}>
      <Popover maxHeight={300} {...props} className={composeRenderProps(props.className, (className) => menuStyles({ className }))}>
        <AriaMenu ref={ref} {...props} className="outline-none" style={{}} />
      </Popover>
    </MenuSlotsProvider>
  );
}

const Menu = (forwardRef as ForwardRefType)(_Menu);

function _MenuItem(props: MenuItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color, size, startContent, endContent, classNames, itemClassNames, styles, itemStyles } = useMenuSlots(props);

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
    </AriaMenuItem>
  );
}

const MenuItem = forwardRef(_MenuItem);

const MenuSection = ListBoxSection;

// exports

export { Menu, MenuItem, MenuSection };
