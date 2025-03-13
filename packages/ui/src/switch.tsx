"use client";

import { useGlobalProps } from "./provider";
import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { ColorProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import React, { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, Switch as AriaSwitch, SwitchProps as AriaSwitchProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const switchStyles = tv({
  slots: {
    base: "text-default flex cursor-pointer items-center",
    self: "relative flex items-center rounded-full outline-none duration-300",
    thumb: "absolute left-1 rounded-full duration-300",
    content: "",
  },
  variants: {
    color: {
      default: { self: "bg-default", thumb: "bg-default-foreground" },
      primary: { self: "bg-primary", thumb: "bg-primary-foreground" },
      secondary: { self: "bg-secondary", thumb: "bg-secondary-foreground" },
      info: { self: "bg-info", thumb: "bg-info-foreground" },
      success: { self: "bg-success", thumb: "bg-success-foreground" },
      warning: { self: "bg-warning", thumb: "bg-warning-foreground" },
      error: { self: "bg-error", thumb: "bg-error-foreground" },
    },
    size: {
      sm: { base: "gap-x-2", self: "h-6 w-10", thumb: "size-4", content: "text-sm" },
      md: { base: "gap-x-2.5", self: "h-8 w-16", thumb: "size-6", content: "text-base" },
      lg: { base: "gap-x-3", self: "h-10 w-20", thumb: "size-8", content: "text-lg" },
    },
    isHovered: { true: "" },
    isPressed: { true: { self: "scale-95" } },
    isSelected: { false: { self: "bg-default bg-opacity-40", thumb: "bg-default-foreground" }, true: { self: "bg-opacity-100" } },
    isFocusVisible: { true: { self: isFocusVisibleVariants.true } },
    isDisabled: isDisabledVariants,
  },
  compoundVariants: [
    { isSelected: true, size: "sm", className: { thumb: "translate-x-4" } },
    { isSelected: true, size: "md", className: { thumb: "translate-x-8" } },
    { isSelected: true, size: "lg", className: { thumb: "translate-x-10" } },
    { isSelected: true, isPressed: true, size: "sm", className: { thumb: "translate-x-3" } },
    { isSelected: true, isPressed: true, size: "md", className: { thumb: "translate-x-7" } },
    { isSelected: true, isPressed: true, size: "lg", className: { thumb: "translate-x-9" } },
    { isPressed: true, size: "sm", className: { thumb: "w-5" } },
    { isPressed: true, size: "md", className: { thumb: "w-7" } },
    { isPressed: true, size: "lg", className: { thumb: "w-9" } },
    { isSelected: false, isHovered: true, className: { self: "bg-opacity-50" } },
    { isSelected: true, isHovered: true, className: { self: "bg-opacity-90" } },
  ],
});

type SwitchStylesReturnType = ReturnType<typeof switchStyles>;

// props

interface SwitchProps extends AriaSwitchProps, ColorProps, SizeProps, StyleSlotsToStyleProps<SwitchStylesReturnType> {}

// component

function _Switch(props: SwitchProps, ref: ForwardedRef<HTMLLabelElement>) {
  const globalProps = useGlobalProps("Switch", props, { color: "default", size: "md" });

  const { color, size, classNames, styles } = globalProps;

  const styleSlots = switchStyles({ color, size });

  return (
    <AriaSwitch
      ref={ref}
      {...globalProps}
      className={composeRenderProps(globalProps.className, (className, { isDisabled }) =>
        styleSlots.base({ isDisabled, className: twMerge(classNames?.base, className) }),
      )}
      style={composeRenderProps(globalProps.style, (style) => mergeProps(styles?.base, style))}
    >
      {composeRenderProps(globalProps.children, (children, { isHovered, isPressed, isSelected, isFocusVisible }) => (
        <>
          <div className={styleSlots.self({ isHovered, isPressed, isSelected, isFocusVisible, className: classNames?.self })} style={styles?.self}>
            <div className={styleSlots.thumb({ isSelected, isPressed, className: classNames?.thumb })} style={styles?.thumb} />
          </div>
          <div className={styleSlots.content({ className: classNames?.content })} style={styles?.content}>
            {children}
          </div>
        </>
      ))}
    </AriaSwitch>
  );
}

const Switch = forwardRef(_Switch);

// exports

export { Switch };
