"use client";

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
    isFit: { true: "" },
    radius: smallRadiusVariants,
  },
  compoundVariants: [
    { size: "sm", isFit: true, className: "px-1.5" },
    { size: "md", isFit: true, className: "px-2" },
    { size: "lg", isFit: true, className: "px-2.5" },
  ],
});

// props

interface ChipProps extends Omit<HTMLAttributes<HTMLDivElement>, "color">, VariantProps, ColorProps, SizeProps, RadiusProps, ContentProps {
  isFit?: boolean;
}

// component

function _Chip(props: ChipProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = size,
    isFit,
    startContent,
    endContent,
    className,
    style,
    children,
    ...restProps
  } = props;

  return (
    <div ref={ref} {...restProps} className={chipStyles({ variant, color, size, radius, isFit, className })} style={style}>
      {startContent}
      {children}
      {endContent}
    </div>
  );
}

const Chip = forwardRef(_Chip);

// exports

export { Chip };
