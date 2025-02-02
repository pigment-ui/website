"use client";

import { isFocusVisibleVariants, radiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ForwardRefType, RadiusProps, SizeProps, StyleSlotsToSlots, StyleSlotsToStyleProps, VariantProps } from "./types";
import { createSlots } from "./utils";
import React, { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  composeRenderProps,
  Tab as AriaTab,
  TabList as AriaTabList,
  TabListProps,
  TabPanel as AriaTabPanel,
  TabPanelProps,
  TabProps,
  Tabs as AriaTabs,
  TabsProps as AriaTabsProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const tabsStyles = tv({
  slots: {
    base: "flex",
    list: "flex h-fit w-fit bg-default-1000/10 backdrop-blur-lg",
    panel: ["h-fit w-full bg-default-1000/10 backdrop-blur-lg", radiusVariants.md],
  },
  variants: {
    orientation: {
      vertical: { base: "flex-col" },
      horizontal: { list: "flex-col" },
    },
    color: {
      default: "",
      primary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    size: {
      sm: { base: "gap-2", list: "gap-2 p-1", panel: "p-2" },
      md: { base: "gap-2.5", list: "gap-2.5 p-1.5", panel: "p-2.5" },
      lg: { base: "gap-3", list: "gap-3 p-2", panel: "p-3" },
    },
    radius: {
      sm: { list: radiusVariants.sm },
      md: { list: radiusVariants.md },
      lg: { list: radiusVariants.lg },
      full: { list: radiusVariants.full },
      none: { list: radiusVariants.none },
    },
    isFocusVisible: { true: { panel: isFocusVisibleVariants.true } },
  },
});

type TabsStylesReturnType = ReturnType<typeof tabsStyles>;

const tabStyles = tv({
  extend: variantColorStyles,
  base: "cursor-pointer",
  variants: {
    size: {
      sm: "h-8 gap-x-2 px-4 text-xs [&_svg]:size-4",
      md: "h-10 gap-x-2.5 px-5 text-sm [&_svg]:size-5",
      lg: "h-12 gap-x-3 px-6 text-base [&_svg]:size-6",
    },
    isSelected: { false: "!border-none !bg-transparent !text-default-500" },
    radius: radiusVariants,
  },
  compoundVariants: [
    { isSelected: false, isHovered: true, className: "!text-default-1000" },
    { isSelected: false, isHovered: true, color: "default-inverted", className: "!text-default-0" },
  ],
});

// props

interface TabsProps extends AriaTabsProps, VariantProps, ColorProps, SizeProps, RadiusProps, StyleSlotsToStyleProps<TabsStylesReturnType> {}

// slots

interface TabsSlotsType extends StyleSlotsToSlots<TabsStylesReturnType> {}

const [TabsSlotsProvider, useTabsSlots] = createSlots<Pick<TabsProps, "variant" | "color" | "size" | "radius"> & TabsSlotsType>();

// component

function _Tabs(props: TabsProps, ref: ForwardedRef<HTMLDivElement>) {
  const { orientation = "vertical", variant = "solid", color = "default", size = "md", radius = size, classNames, styles } = props;

  const styleSlots = tabsStyles({ orientation, color, size, radius });

  return (
    <TabsSlotsProvider value={{ variant, color, size, radius, styleSlots, classNames, styles }}>
      <AriaTabs
        ref={ref}
        {...props}
        className={composeRenderProps(props.className, (className) => styleSlots.base({ className: twMerge(classNames?.base, className) }))}
        style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
      />
    </TabsSlotsProvider>
  );
}

const Tabs = forwardRef(_Tabs);

function _Tab(props: TabProps, ref: ForwardedRef<HTMLDivElement>) {
  const { variant, color, size, radius } = useTabsSlots(props);

  return (
    <AriaTab
      ref={ref}
      id={typeof props.children === "string" ? props.children : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, { isSelected, isHovered, isPressed, isDisabled, isFocusVisible }) =>
        tabStyles({
          variant,
          color,
          size,
          radius,
          isSelected,
          isHovered: !isSelected && isHovered,
          isPressed,
          isDisabled,
          isFocusVisible,
          className,
        }),
      )}
    />
  );
}

const Tab = (forwardRef as ForwardRefType)(_Tab);

function _TabList<T extends object>(props: TabListProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { styleSlots, classNames, styles } = useTabsSlots(props);

  return (
    <AriaTabList
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className) => styleSlots.list({ className: twMerge(classNames?.list, className) }))}
      style={composeRenderProps(props.style, (style) => mergeProps(styles?.list, style))}
    />
  );
}

const TabList = (forwardRef as ForwardRefType)(_TabList);

function _TabPanel(props: TabPanelProps, ref: ForwardedRef<HTMLDivElement>) {
  const { styleSlots, classNames, styles } = useTabsSlots(props);

  return (
    <AriaTabPanel
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, { isFocusVisible }) =>
        styleSlots.panel({ isFocusVisible, className: twMerge(classNames?.panel, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(styles?.panel, style))}
    />
  );
}

const TabPanel = (forwardRef as ForwardRefType)(_TabPanel);

// exports

export { Tabs, Tab, TabList, TabPanel };
