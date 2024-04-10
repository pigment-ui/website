"use client";

import { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

import { ColorProps, SizeProps, StyleProps } from "./types";

// styles

const spinnerStyles = tv({
  base: "animate-spin rounded-full border border-t-transparent border-r-transparent",
  variants: {
    color: {
      default: "border-b-default-1000 border-l-default-1000",
      info: "border-b-info-500 border-l-info-500",
      success: "border-b-success-500 border-l-success-500",
      warning: "border-b-warning-500 border-l-warning-500",
      error: "border-b-error-500 border-l-error-500",
    },
    size: {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    },
  },
});

// props

interface PigmentSpinnerProps extends ColorProps, SizeProps, StyleProps {}

// component

function _Spinner(props: PigmentSpinnerProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", className, style } = props;

  return <div ref={ref} className={spinnerStyles({ color, size, className })} style={style} />;
}

const Spinner = forwardRef(_Spinner);

// exports

export { Spinner };
export type { PigmentSpinnerProps };
