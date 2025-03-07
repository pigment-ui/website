"use client";

import { ColorProps, SizeProps, StyleProps } from "./types";
import React, { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

// styles

const spinnerStyles = tv({
  base: "animate-spin rounded-full border border-r-transparent border-t-transparent",
  variants: {
    color: {
      default: "border-b-default-1000 border-l-default-1000",
      inverted: "border-b-default-0 border-l-default-0",
      primary: "border-b-primary-500 border-l-primary-500",
      secondary: "border-b-secondary-500 border-l-secondary-500",
      info: "border-b-info-500 border-l-info-500",
      success: "border-b-success-500 border-l-success-500",
      warning: "border-b-warning-500 border-l-warning-500",
      error: "border-b-error-500 border-l-error-500",
    },
    size: { sm: "size-4", md: "size-5", lg: "size-6" },
  },
});

// props

interface SpinnerProps extends ColorProps, SizeProps, StyleProps {}

// component

function _Spinner(props: SpinnerProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", className, style } = props;

  return <div ref={ref} className={spinnerStyles({ color, size, className })} style={style} />;
}

const Spinner = forwardRef(_Spinner);

// exports

export { Spinner };
