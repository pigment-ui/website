"use client";

import { useGlobalProps } from "./provider";
import { radiusVariants, useVariantAndColorStyles } from "./styles";
import { ColorProps, ContentProps, RadiusProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import React, { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const useBadgeStyles = () =>
  tv({
    extend: useVariantAndColorStyles(),
    base: "!absolute min-w-max whitespace-nowrap p-1",
    slots: {
      wrapper: "relative inline-block",
    },
    variants: {
      size: {
        sm: "h-4 min-w-4 gap-x-2 text-xs [&_svg]:size-2",
        md: "h-5 min-w-5 gap-x-2.5 text-sm [&_svg]:size-3",
        lg: "h-6 min-w-6 gap-x-3 text-base [&_svg]:size-4",
      },
      placement: {
        "top right": "right-0 top-0 -translate-y-1/2 translate-x-1/2",
        "top left": "left-0 top-0 -translate-x-1/2 -translate-y-1/2",
        "bottom right": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
        "bottom left": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
      },
      radius: radiusVariants,
    },
  });

type BadgeStylesReturnType = ReturnType<ReturnType<typeof useBadgeStyles>>;

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
  placement?: "top right" | "top left" | "bottom right" | "bottom left";
}

// component

function _Badge(props: BadgeProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("Badge", props, { variant: "solid", color: "default", size: "md", radius: "full", placement: "top right" });

  const { variant, color, size, radius, placement, content, startContent, endContent, classNames, className, styles, style, children, ...restProps } =
    globalProps;

  const styleSlots = useBadgeStyles()({ placement, variant, color, size, radius, className });

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
