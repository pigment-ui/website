"use client";

import { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

import { radiusVariants } from "./styles";
import { RadiusProps, StyleProps } from "./types";

// styles

const skeletonStyles = tv({
  base: "bg-default-1000/10",
  variants: {
    animation: { pulse: "animate-pulse", none: "animate-none" },
    ...radiusVariants,
  },
});

// props

interface SkeletonProps extends RadiusProps, StyleProps {
  animation?: "pulse" | "none";
}

// component

function _Skeleton(props: SkeletonProps, ref: ForwardedRef<HTMLDivElement>) {
  const { animation = "pulse", radius = "full", className, style } = props;

  return <div ref={ref} className={skeletonStyles({ animation, radius, className })} style={style} />;
}

const Skeleton = forwardRef(_Skeleton);

// exports

export { Skeleton };
