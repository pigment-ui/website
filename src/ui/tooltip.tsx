"use client";

import { ForwardedRef, forwardRef } from "react";
import { composeRenderProps, Tooltip as AriaTooltip, TooltipProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { cardStyles } from "./card";

// styles

const tooltipStyles = tv({
  base: cardStyles().base({ className: "p-2" }),
});

// props

interface PigmentTooltipProps extends TooltipProps {}

// component

function _Tooltip(props: PigmentTooltipProps, ref: ForwardedRef<HTMLDivElement>) {
  return <AriaTooltip ref={ref} offset={8} {...props} className={composeRenderProps(props.className, (className) => tooltipStyles({ className }))} />;
}

const Tooltip = forwardRef(_Tooltip);

// exports

export { Tooltip };
export type { PigmentTooltipProps };
