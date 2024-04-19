"use client";

import { ForwardedRef, forwardRef } from "react";
import { composeRenderProps, OverlayArrow, Tooltip as AriaTooltip, TooltipProps } from "react-aria-components";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import { cardStyles } from "./card";

// styles

const tooltipStyles = tv({
  base: cardStyles().base({ className: "p-4" }),
});

// props

interface PigmentTooltipProps extends TooltipProps {
  showArrow?: boolean;
  arrowSize?: number;
}

// component

function _Tooltip(props: PigmentTooltipProps, ref: ForwardedRef<HTMLDivElement>) {
  const { showArrow = true, arrowSize = 16 } = props;

  return (
    <AriaTooltip ref={ref} offset={16} {...props} className={composeRenderProps(props.className, (className) => tooltipStyles({ className }))}>
      {composeRenderProps(props.children, (children, { placement }) => (
        <>
          {showArrow && (
            <OverlayArrow>
              <svg
                viewBox="0 0 8 8"
                width={arrowSize}
                height={arrowSize}
                className={twMerge(
                  "fill-default-0 stroke-default-1000/20 stroke-[.5px]",
                  { bottom: "rotate-180", left: "-rotate-90", right: "rotate-90", top: "", center: "" }[placement],
                )}
              >
                <path d="M0 0 L4 4 L8 0" />
              </svg>
            </OverlayArrow>
          )}
          {children}
        </>
      ))}
    </AriaTooltip>
  );
}

const Tooltip = forwardRef(_Tooltip);

// exports

export { Tooltip };
export type { PigmentTooltipProps };
