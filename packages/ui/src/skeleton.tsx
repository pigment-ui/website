"use client";

import { useGlobalProps } from "./provider";
import { StyleProps } from "./types";
import React, { ForwardedRef, forwardRef } from "react";
import { tv } from "tailwind-variants";

// styles

const useSkeletonStyles = () =>
  tv({
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
  const globalProps = useGlobalProps("Skeleton", props, { animation: "pulse" });

  const { animation, className, style } = globalProps;

  return <div ref={ref} className={useSkeletonStyles()({ animation, className })} style={style} />;
}

const Skeleton = forwardRef(_Skeleton);

// exports

export { Skeleton };
