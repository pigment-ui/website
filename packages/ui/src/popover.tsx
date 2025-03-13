"use client";

import { cardStyles } from "./card";
import { useGlobalProps } from "./provider";
import React, { ForwardedRef, forwardRef } from "react";
import { composeRenderProps, DialogTrigger, OverlayArrow, Popover as AriaPopover, PopoverProps as AriaPopoverProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const popoverStyles = tv({
  base: cardStyles().base({ className: "p-4" }),
});

// props

interface PopoverProps extends AriaPopoverProps {
  hideArrow?: boolean;
  arrowSize?: number;
}

// component

function _Popover(props: PopoverProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("Popover", props, { arrowSize: 16 });

  const { hideArrow, arrowSize } = globalProps;

  return (
    <AriaPopover
      ref={ref}
      offset={16}
      {...globalProps}
      className={composeRenderProps(globalProps.className, (className, { isEntering, isExiting, placement }) =>
        popoverStyles({
          className: twMerge(
            "duration-300 [transition-duration:0ms]",
            isEntering && "animate-in fade-in",
            isExiting && "animate-out fade-out",
            {
              bottom: isEntering ? "slide-in-from-top-4" : isExiting ? "slide-out-to-top-4" : "",
              left: isEntering ? "slide-in-from-right-4" : isExiting ? "slide-out-to-right-4" : "",
              right: isEntering ? "slide-in-from-left-4" : isExiting ? "slide-out-to-left-4" : "",
              top: isEntering ? "slide-in-from-bottom-4" : isExiting ? "slide-out-to-bottom-4" : "",
              center: "",
            }[placement ?? "center"],
            className,
          ),
        }),
      )}
    >
      {composeRenderProps(globalProps.children, (children, { placement }) => (
        <>
          {!hideArrow && (
            <OverlayArrow>
              <svg
                viewBox="0 0 8 8"
                width={arrowSize}
                height={arrowSize}
                className={twMerge(
                  "fill-default-0 stroke-default-1000/20 stroke-[.25px]",
                  {
                    bottom: "translate-y-px rotate-180",
                    left: "-translate-x-px -rotate-90",
                    right: "translate-x-px rotate-90",
                    top: "-translate-y-px",
                    center: "",
                  }[placement ?? "center"],
                )}
              >
                <path d="M0 0 L4 4 L8 0" />
              </svg>
            </OverlayArrow>
          )}
          {children}
        </>
      ))}
    </AriaPopover>
  );
}

const Popover = forwardRef(_Popover);

// exports

export { Popover, DialogTrigger as PopoverTrigger };
