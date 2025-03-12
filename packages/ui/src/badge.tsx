"use client";

import { radiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ContentProps, RadiusProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import React, { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const badgeStyles = tv({
  extend: variantColorStyles,
  base: "!absolute min-w-max whitespace-nowrap",
  slots: {
    wrapper: "relative inline-block",
  },
  variants: {
    size: {
      sm: "h-4 min-w-4 gap-x-0.5 px-1 text-xs [&_svg]:size-2",
      md: "h-5 min-w-5 gap-x-1 px-1.5 text-sm [&_svg]:size-3",
      lg: "h-6 min-w-6 gap-x-1.5 px-2 text-base [&_svg]:size-4",
    },
    placement: {
      "top right": "right-0 top-0 -translate-y-1/2 translate-x-1/2",
      "top left": "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
      "bottom right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
      "bottom left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
    },
    isCompact: { true: "px-0" },
    radius: radiusVariants,
  },
});

type BadgeStylesReturnType = ReturnType<typeof badgeStyles>;

// props

interface BadgeProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color" | "content">,
    VariantProps,
    ColorProps,
    SizeProps,
    RadiusProps,
    ContentProps,
    StyleSlotsToStyleProps<BadgeStylesReturnType> {
  content?: ReactNode;
  isCompact?: boolean;
  placement?: "top right" | "top left" | "bottom right" | "bottom left";
}

// component

function _Badge(props: BadgeProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = "full",
    placement = "top right",
    isCompact,
    content,
    startContent,
    endContent,
    classNames,
    className,
    styles,
    style,
    children,
    ...restProps
  } = props;

  const styleSlots = badgeStyles({ placement, variant, color, size, radius, isCompact, className });

  return (
    <div className={styleSlots.wrapper({ className: twMerge(classNames?.wrapper, className) })} style={mergeProps(styles?.wrapper, style)}>
      <div ref={ref} {...restProps} className={styleSlots.base({ className: classNames?.base })} style={styles?.base}>
        <div>{startContent}</div>
        <div>{content}</div>
        <div>{endContent}</div>
      </div>
      {children}
    </div>
  );
}

const Badge = forwardRef(_Badge);

// exports

export { Badge };
