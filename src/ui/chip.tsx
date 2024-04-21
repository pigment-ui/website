"use client";

import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { tv } from "tailwind-variants";

import { smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ContentProps, RadiusProps, SizeProps, VariantProps } from "./types";

// styles

const chipStyles = tv({
  extend: variantColorStyles,
  base: "",
  variants: {
    size: {
      sm: "h-6 gap-x-1.5 px-3 text-xs [&_svg]:size-3",
      md: "h-8 gap-x-2 px-4 text-sm [&_svg]:size-4",
      lg: "h-10 gap-x-2.5 px-5 text-base [&_svg]:size-5",
    },
    isIconOnly: { true: "" },
    ...smallRadiusVariants,
  },
  compoundVariants: [
    { size: "sm", isIconOnly: true, className: "px-1.5" },
    { size: "md", isIconOnly: true, className: "px-2" },
    { size: "lg", isIconOnly: true, className: "px-2.5" },
  ],
});

// props

interface PigmentChipProps extends Omit<HTMLAttributes<HTMLDivElement>, "color">, VariantProps, ColorProps, SizeProps, RadiusProps, ContentProps {
  isIconOnly?: boolean;
}

// component

function _Chip(props: PigmentChipProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = "md",
    isIconOnly,
    startContent,
    endContent,
    className,
    style,
    children,
    ...restProps
  } = props;

  return (
    <div ref={ref} {...restProps} className={chipStyles({ variant, color, size, radius, isIconOnly, className })} style={style}>
      {startContent}
      {children}
      {endContent}
    </div>
  );
}

const Chip = forwardRef(_Chip);

// exports

export { Chip };
export type { PigmentChipProps };
