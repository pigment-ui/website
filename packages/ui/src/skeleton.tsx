"use client";

import { StyleProps } from "./types";
import React, { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

// styles

const skeletonStyles = tv({
  base: "bg-default/10",
  variants: {
    animation: { pulse: "animate-pulse", none: "animate-none" },
  },
});

// props

interface SkeletonProps extends StyleProps {
  animation?: "pulse" | "none";
}

// component

function _Skeleton(props: SkeletonProps, ref: ForwardedRef<HTMLDivElement>) {
  const { animation = "pulse", className, style } = props;

  return <div ref={ref} className={skeletonStyles({ animation, className })} style={style} />;
}

const Skeleton = forwardRef(_Skeleton);

// exports

export { Skeleton };
