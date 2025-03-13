"use client";

import { ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType, useListBoxItemStyles, useListBoxSectionStyles } from "./list-box";
import { Popover } from "./popover";
import { useGlobalProps } from "./provider";
import { ForwardRefType, StyleProps } from "./types";
import { createSlots } from "./utils";
import { CheckIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  Collection,
  composeRenderProps,
  Header,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
  MenuItemProps as AriaMenuItemProps,
  MenuProps as AriaMenuProps,
  MenuSection as AriaMenuSection,
  MenuSectionProps as AriaMenuSectionProps,
  MenuTrigger,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const useMenuStyles = () => tv({ base: "p-2" });

const useMenuItemStyles = useListBoxItemStyles;

const useMenuSectionStyles = useListBoxSectionStyles;

// props

interface MenuProps<T extends object>
  extends Omit<AriaMenuProps<T>, keyof StyleProps>,
    Omit<ComponentPropsWithoutRef<typeof ListBox<T>>, keyof AriaMenuProps<T> | "asCard">,
    Omit<ComponentPropsWithoutRef<typeof Popover>, keyof Omit<AriaMenuProps<T>, keyof StyleProps>> {}

interface MenuItemProps extends AriaMenuItemProps, Omit<ComponentPropsWithoutRef<typeof ListBoxItem>, keyof AriaMenuItemProps> {}

interface MenuSectionProps<T extends object>
  extends AriaMenuSectionProps<T>,
    Omit<ComponentPropsWithoutRef<typeof ListBoxSection>, keyof AriaMenuSectionProps<T>> {}

// slots

const [MenuSlotsProvider, useMenuSlots] = createSlots<ListBoxSlotsType<object>>();

// component

function _Menu<T extends object>(props: MenuProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("Menu", props, { variant: "soft", color: "default", size: "md" });

  const { variant, color, size, itemClassNames, itemStyles, sectionClassNames, sectionStyles } = globalProps;

  return (
    <MenuSlotsProvider value={{ variant, color, size, itemClassNames, itemStyles, sectionClassNames, sectionStyles }}>
      <Popover
        maxHeight={300}
        hideArrow
        {...globalProps}
        className={composeRenderProps(globalProps.className, (className) => useMenuStyles()({ className }))}
      >
        <AriaMenu ref={ref} {...globalProps} className="outline-none" style={{}} />
      </Popover>
    </MenuSlotsProvider>
  );
}

const Menu = (forwardRef as ForwardRefType)(_Menu);

function _MenuItem(props: MenuItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { variant, color, size, startContent, endContent, icon, classNames, itemClassNames, styles, itemStyles } = useMenuSlots(props);

  const styleSlots = useMenuItemStyles()({ color, size });

  return (
    <AriaMenuItem
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
      {composeRenderProps(props.children, (children, { isSelected, selectionMode }) => (
        <>
          {startContent}
          <div
            className={styleSlots.content({ className: twMerge(itemClassNames?.content, classNames?.content) })}
            style={mergeProps(itemStyles?.content, styles?.content)}
          >
            {children}
          </div>
          {selectionMode !== "none" && (
            <div
              className={styleSlots.icon({ isSelected, className: twMerge(itemClassNames?.icon, classNames?.icon) })}
              style={mergeProps(itemStyles?.icon, styles?.icon)}
            >
              {icon ?? <CheckIcon />}
            </div>
          )}
          {endContent}
        </>
      ))}
    </AriaMenuItem>
  );
}

const MenuItem = forwardRef(_MenuItem);

function _MenuSection<T extends object>(props: MenuSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { title, items, size, className, classNames, sectionClassNames, style, styles, sectionStyles, children } = useMenuSlots(props);

  const styleSlots = useMenuSectionStyles()({ size });

  return (
    <AriaMenuSection
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
    </AriaMenuSection>
  );
}

const MenuSection = (forwardRef as ForwardRefType)(_MenuSection);

// exports

export { Menu, MenuItem, MenuSection, MenuTrigger };
