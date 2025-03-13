"use client";

import { useGlobalProps } from "./provider";
import { smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ContentProps, RadiusProps, SizeProps, VariantProps } from "./types";
import React, { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

// styles

const chipStyles = tv({
  extend: variantColorStyles,
  base: "min-w-max whitespace-nowrap",
  variants: {
    size: {
      sm: "h-6 gap-x-1.5 px-3 text-xs [&_svg]:size-3",
      md: "h-8 gap-x-2 px-4 text-sm [&_svg]:size-4",
      lg: "h-10 gap-x-2.5 px-5 text-base [&_svg]:size-5",
    },
    isCompact: { true: "" },
    radius: smallRadiusVariants,
  },
  compoundVariants: [
    { size: "sm", isCompact: true, className: "px-1.5" },
    { size: "md", isCompact: true, className: "px-2" },
    { size: "lg", isCompact: true, className: "px-2.5" },
  ],
});

// props

interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, "color">, VariantProps, ColorProps, SizeProps, RadiusProps, ContentProps {
  isCompact?: boolean;
}

// component

function _Chip(props: ChipProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("Chip", props, { variant: "solid", color: "default", size: "md", radius: props.size || "md" });

  const { variant, color, size, radius, isCompact, startContent, endContent, className, style, children, ...restProps } = globalProps;

  return (
    <div ref={ref} {...restProps} className={chipStyles({ variant, color, size, radius, isCompact, className })} style={style}>
      <div>{startContent}</div>
      <div>{children}</div>
      <div>{endContent}</div>
    </div>
  );
}

const Chip = forwardRef(_Chip);

// exports

export { Chip };
