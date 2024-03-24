"use client";

import { ForwardedRef, forwardRef } from "react";
import { Tooltip as AriaTooltip, TooltipProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { FilterProps } from "./types";

import { Card } from "./card";

// styles

const tooltipStyles = tv({
  base: "p-2",
});

// props

interface PigmentTooltipProps extends FilterProps<TooltipProps> {}

// component

function _Tooltip(props: PigmentTooltipProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, className, style, ...restProps } = props;

  return (
    <Card asChild className={tooltipStyles({ className })} style={style}>
      <AriaTooltip ref={ref} offset={8} {...restProps}>
        {children}
      </AriaTooltip>
    </Card>
  );
}

const Tooltip = forwardRef(_Tooltip);

// exports

export { Tooltip };
export type { PigmentTooltipProps };
