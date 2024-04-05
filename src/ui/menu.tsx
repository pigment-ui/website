"use client";

import { CheckIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Menu as AriaMenu, MenuItem as AriaMenuItem, MenuItemProps, MenuProps, Popover, PopoverProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { ColorProps, ContentProps, FilterProps, ForwardRefType, SizeProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Card } from "./card";
import { ListBoxSection, PigmentListBoxSectionProps } from "./list-box";

// styles

const menuStyles = tv({
  base: "p-2 overflow-auto",
});

const menuItemStyles = tv({
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

type MenuItemStylesReturnType = ReturnType<typeof menuItemStyles>;

// props

interface PigmentMenuProps<T extends object>
  extends FilterProps<MenuProps<T>>,
    Pick<PopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip" | "maxHeight">,
    ColorProps,
    SizeProps {
  itemClassNames?: PigmentMenuItemProps["classNames"];
  itemStyles?: PigmentMenuItemProps["styles"];
}

interface PigmentMenuItemProps extends FilterProps<MenuItemProps>, ColorProps, ContentProps, StyleSlotsToStyleProps<MenuItemStylesReturnType> {}

// slots

interface MenuSlotsType extends Pick<PigmentMenuProps<any>, "color" | "size" | "itemClassNames" | "itemStyles"> {}

const [MenuSlotsProvider, useMenuSlots] = createSlots<MenuSlotsType>();

// component

function _Menu<T extends object>(props: PigmentMenuProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    color,
    size = "md",
    placement,
    offset,
    crossOffset,
    shouldFlip,
    maxHeight = 300,
    children,
    className,
    itemClassNames,
    style,
    itemStyles,
  } = props;

  return (
    <MenuSlotsProvider value={{ color, size, itemClassNames, itemStyles }}>
      <Card asChild className={menuStyles({ className })} style={style}>
        <Popover placement={placement} offset={offset} crossOffset={crossOffset} shouldFlip={shouldFlip} maxHeight={maxHeight}>
          <AriaMenu ref={ref} {...props} className="outline-none" style={{}}>
            {children}
          </AriaMenu>
        </Popover>
      </Card>
    </MenuSlotsProvider>
  );
}

const Menu = (forwardRef as ForwardRefType)(_Menu);

function _MenuItem(props: PigmentMenuItemProps, ref: ForwardedRef<HTMLDivElement>) {
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
  } = useMenuSlots(props);

  const styleSlots = menuItemStyles({ color, size });

  return (
    <AriaMenuItem
      ref={ref}
      id={typeof children === "string" ? children : undefined}
      textValue={typeof children === "string" ? children : undefined}
      {...props}
      className={({ isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        styleSlots.base({
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
            className={styleSlots.content({ className: twMerge(itemClassNames?.content, classNames?.content) })}
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

function _MenuSection<T extends object>(props: PigmentListBoxSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  return <ListBoxSection ref={ref} {...props} />;
}

const MenuSection = (forwardRef as ForwardRefType)(_MenuSection);

// exports

export { Menu, MenuItem, MenuSection };
export type { PigmentMenuProps, PigmentMenuItemProps };
