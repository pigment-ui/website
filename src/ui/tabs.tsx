"use client";

import { ForwardedRef, forwardRef } from "react";
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
  TabsProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { isFocusVisibleVariants, radiusVariants, smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ForwardRefType, RadiusProps, SizeProps, StyleSlotsToSlots, StyleSlotsToStyleProps, VariantProps } from "./types";
import { createSlots } from "./utils";

// styles

const tabsStyles = tv({
  slots: {
    base: "flex",
    list: "flex w-fit h-fit bg-default-1000/10",
    panel: "w-full h-fit bg-default-1000/10",
  },
  variants: {
    orientation: {
      vertical: { base: "flex-col" },
      horizontal: { list: "flex-col" },
    },
    size: {
      sm: { base: "gap-2", list: "p-1 gap-2", panel: "p-2 text-xs" },
      md: { base: "gap-2.5", list: "p-1.5 gap-2.5", panel: "p-2.5 text-sm" },
      lg: { base: "gap-3", list: "p-2 gap-3", panel: "p-3 text-base" },
    },
    radius: {
      sm: { list: radiusVariants.radius.sm, panel: radiusVariants.radius.sm },
      md: { list: radiusVariants.radius.md, panel: radiusVariants.radius.md },
      lg: { list: radiusVariants.radius.lg, panel: radiusVariants.radius.lg },
      full: { list: radiusVariants.radius.full, panel: radiusVariants.radius.full },
      none: { list: radiusVariants.radius.none, panel: radiusVariants.radius.none },
    },
    isFocusVisible: {
      true: { panel: isFocusVisibleVariants.isFocusVisible.true },
    },
  },
});

type TabsStylesReturnType = ReturnType<typeof tabsStyles>;

const tabStyles = tv({
  extend: variantColorStyles,
  base: "cursor-pointer",
  variants: {
    size: {
      sm: "h-6 gap-x-1.5 px-3 text-xs [&_svg]:size-3",
      md: "h-8 gap-x-2 px-4 text-sm [&_svg]:size-4",
      lg: "h-10 gap-x-2.5 px-5 text-base [&_svg]:size-5",
    },
    isSelected: { false: "!bg-transparent !text-default-500 !border-none" },
    ...smallRadiusVariants,
  },
  compoundVariants: [{ isSelected: false, isHovered: true, className: "!text-default-1000" }],
});

// props

interface PigmentTabsProps extends TabsProps, VariantProps, ColorProps, SizeProps, RadiusProps, StyleSlotsToStyleProps<TabsStylesReturnType> {}

// slots

interface TabsSlotsType extends StyleSlotsToSlots<TabsStylesReturnType> {}

const [TabsSlotsProvider, useTabsSlots] = createSlots<Pick<PigmentTabsProps, "variant" | "color" | "size" | "radius"> & TabsSlotsType>();

// component

function _Tabs(props: PigmentTabsProps, ref: ForwardedRef<HTMLDivElement>) {
  const { orientation = "vertical", variant = "solid", color = "default", size = "md", radius = "md", classNames, styles } = props;

  const styleSlots = tabsStyles({ orientation, size, radius });

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
        tabStyles({ variant, color, size, radius, isSelected, isHovered, isPressed, isDisabled, isFocusVisible, className }),
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
export type { PigmentTabsProps };