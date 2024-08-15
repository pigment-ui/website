"use client";

import { ForwardedRef, forwardRef } from "react";
import { composeRenderProps, Switch as AriaSwitch, SwitchProps as AriaSwitchProps } from "react-aria-components";
import { tv } from "tailwind-variants";
import { ColorProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import { twMerge } from "tailwind-merge";
import { mergeProps } from "react-aria";
import { isDisabledVariants, isFocusVisibleVariants } from "#/ui/styles";

// styles

const switchStyles = tv({
  slots: {
    base: "flex items-center cursor-pointer",
    self: "rounded-full duration-300 relative flex items-center",
    thumb: "rounded-full duration-300 absolute left-1 bg-default-0",
    content: "",
  },
  variants: {
    color: {
      default: { self: "bg-default-1000" },
      primary: { self: "bg-primary-500" },
      info: { self: "bg-info-500" },
      success: { self: "bg-success-500" },
      warning: { self: "bg-warning-500" },
      error: { self: "bg-error-500" },
    },
    size: {
      sm: { base: "gap-x-2", self: "h-6 w-10", thumb: "size-4", content: "text-sm" },
      md: { base: "gap-x-2.5", self: "h-8 w-16", thumb: "size-6", content: "text-base" },
      lg: { base: "gap-x-3", self: "h-10 w-20", thumb: "size-8", content: "text-lg" },
    },
    isHovered: { true: "" },
    isPressed: { true: { self: "scale-95" } },
    isSelected: { false: { self: "bg-opacity-40 bg-default-1000" }, true: { self: "bg-opacity-100" } },
    isFocusVisible: { true: { self: isFocusVisibleVariants.isFocusVisible.true } },
    ...isDisabledVariants,
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

interface SwitchProps extends AriaSwitchProps, SizeProps, ColorProps, StyleSlotsToStyleProps<SwitchStylesReturnType> {}

// component

function _Switch(props: SwitchProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { color = "default", size = "md", classNames, styles } = props;

  const styleSlots = switchStyles({ color, size });

  return (
    <AriaSwitch
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, { isDisabled }) =>
        styleSlots.base({ isDisabled, className: twMerge(classNames?.base, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
    >
      {composeRenderProps(props.children, (children, { isHovered, isPressed, isSelected, isFocusVisible }) => (
        <>
          <div className={styleSlots.self({ isHovered, isPressed, isSelected, isFocusVisible, className: classNames?.self })} style={styles?.self}>
            <div className={styleSlots.thumb({ isSelected, isPressed, className: classNames?.thumb })} style={styles?.thumb} />
          </div>
          <div>{children}</div>
        </>
      ))}
    </AriaSwitch>
  );
}

const Switch = forwardRef(_Switch);

// exports

export { Switch };
