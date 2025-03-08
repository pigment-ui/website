"use client";

import { ColorExtendedProps, SizeProps, StyleProps } from "./types";
import React, { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

// styles

const spinnerStyles = tv({
  base: "animate-spin rounded-full border border-r-transparent border-t-transparent",
  variants: {
    color: {
      default: "border-b-default-1000 border-l-default-1000",
      inverted: "border-b-default-0 border-l-default-0",
      primary: "border-b-primary border-l-primary",
      secondary: "border-b-secondary border-l-secondary",
      info: "border-b-info border-l-info",
      success: "border-b-success border-l-success",
      warning: "border-b-warning border-l-warning",
      error: "border-b-error border-l-error",
    },
    size: { sm: "size-4", md: "size-5", lg: "size-6" },
  },
});

// props

interface SpinnerProps extends ColorExtendedProps, SizeProps, StyleProps {}

// component

function _Spinner(props: SpinnerProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", className, style } = props;

  return <div ref={ref} className={spinnerStyles({ color, size, className })} style={style} />;
}

const Spinner = forwardRef(_Spinner);

// exports

export { Spinner };
