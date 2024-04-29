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
  TabsProps as AriaTabsProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isFocusVisibleVariants, radiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ForwardRefType, RadiusProps, SizeProps, StyleSlotsToSlots, StyleSlotsToStyleProps, VariantProps } from "./types";
import { createSlots } from "./utils";

// styles

const tabsStyles = tv({
  extend: variantColorStyles,
  base: "cursor-pointer",
  slots: {
    wrapper: "flex",
    list: "flex w-fit h-fit bg-default-1000/10",
    panel: "w-full h-fit bg-default-1000/10",
  },
  variants: {
    orientation: { vertical: { wrapper: "flex-col" }, horizontal: { list: "flex-col" } },
    size: {
      sm: { base: "h-8 gap-x-2 px-4 text-xs [&_svg]:size-4", wrapper: "gap-2", list: "p-1 gap-2", panel: "p-2 text-xs" },
      md: { base: "h-10 gap-x-2.5 px-5 text-sm [&_svg]:size-5", wrapper: "gap-2.5", list: "p-1.5 gap-2.5", panel: "p-2.5 text-sm" },
      lg: { base: "h-12 gap-x-3 px-6 text-base [&_svg]:size-6", wrapper: "gap-3", list: "p-2 gap-3", panel: "p-3 text-base" },
    },
    radius: {
      sm: { base: radiusVariants.radius.sm, list: radiusVariants.radius.sm, panel: radiusVariants.radius.sm },
      md: { base: radiusVariants.radius.md, list: radiusVariants.radius.md, panel: radiusVariants.radius.md },
      lg: { base: radiusVariants.radius.lg, list: radiusVariants.radius.lg, panel: radiusVariants.radius.lg },
      full: { base: radiusVariants.radius.full, list: radiusVariants.radius.full, panel: radiusVariants.radius.full },
      none: { base: radiusVariants.radius.none, list: radiusVariants.radius.none, panel: radiusVariants.radius.none },
    },

    isSelected: { false: "!bg-transparent !text-default-500 !border-none !shadow-none" },
    isFocusVisible: { true: { panel: isFocusVisibleVariants.isFocusVisible.true } },
  },
  compoundVariants: [{ isSelected: false, isHovered: true, className: "!text-default-1000" }],
});

type TabsStylesReturnType = ReturnType<typeof tabsStyles>;

// props

interface TabsProps extends AriaTabsProps, VariantProps, ColorProps, SizeProps, RadiusProps, StyleSlotsToStyleProps<TabsStylesReturnType> {}

// slots

interface TabsSlotsType extends StyleSlotsToSlots<TabsStylesReturnType> {}

const [TabsSlotsProvider, useTabsSlots] = createSlots<Pick<TabsProps, "variant" | "color" | "size" | "radius"> & TabsSlotsType>();

// component

function _Tabs(props: TabsProps, ref: ForwardedRef<HTMLDivElement>) {
  const { orientation = "vertical", variant = "solid", color = "default", size = "md", radius = "md", classNames, styles } = props;

  const styleSlots = tabsStyles({ orientation, size, radius });

  return (
    <TabsSlotsProvider value={{ variant, color, size, radius, styleSlots, classNames, styles }}>
      <AriaTabs
        ref={ref}
        {...props}
        className={composeRenderProps(props.className, (className) => styleSlots.wrapper({ className: twMerge(classNames?.wrapper, className) }))}
        style={composeRenderProps(props.style, (style) => mergeProps(styles?.wrapper, style))}
      />
    </TabsSlotsProvider>
  );
}

const Tabs = forwardRef(_Tabs);

function _Tab(props: TabProps, ref: ForwardedRef<HTMLDivElement>) {
  const { variant, color, size, radius, styleSlots, classNames, styles } = useTabsSlots(props);

  return (
    <AriaTab
      ref={ref}
      id={typeof props.children === "string" ? props.children : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, { isSelected, isHovered, isPressed, isDisabled, isFocusVisible }) =>
        styleSlots.base({
          variant,
          color,
          size,
          radius,
          isSelected,
          isHovered,
          isPressed,
          isDisabled,
          isFocusVisible,
          className: twMerge(classNames?.base, className),
        }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
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
export type { TabsProps };
