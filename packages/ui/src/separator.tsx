"use client";

import { useGlobalProps } from "./provider";
import { SizeProps } from "./types";
import React, { ForwardedRef, forwardRef } from "react";
import { Separator as AriaSeparator, SeparatorProps as AriaSeparatorProps } from "react-aria-components";
import { tv } from "tailwind-variants";

// styles

const useSeparatorStyles = () =>
  tv({
    base: "bg-default/20 rounded-full border-none",
    variants: {
      orientation: { horizontal: "w-full", vertical: "h-full" },
      size: { sm: "", md: "", lg: "" },
    },
    compoundVariants: [
      { orientation: "horizontal", size: "sm", className: "h-px" },
      { orientation: "horizontal", size: "md", className: "h-0.5" },
      { orientation: "horizontal", size: "lg", className: "h-1" },
      { orientation: "vertical", size: "sm", className: "w-px" },
      { orientation: "vertical", size: "md", className: "w-0.5" },
      { orientation: "vertical", size: "lg", className: "w-1" },
    ],
  });

// props

interface SeparatorProps extends AriaSeparatorProps, SizeProps {}

// component

function _Separator(props: SeparatorProps, ref: ForwardedRef<HTMLElement>) {
  const globalProps = useGlobalProps("Separator", props, { orientation: "horizontal", size: "sm" });

  const { orientation, size, className, style, ...restProps } = globalProps;

  return (
    <AriaSeparator
      ref={ref}
      {...restProps}
      orientation={orientation}
      className={useSeparatorStyles()({ orientation, size, className })}
      style={style}
    />
  );
}

const Separator = forwardRef(_Separator);

// exports

export { Separator };
