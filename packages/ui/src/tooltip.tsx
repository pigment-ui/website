"use client";

import React, { cloneElement, ForwardedRef, forwardRef, ReactElement, useRef } from "react";
import { mergeProps, useButton } from "react-aria";
import { composeRenderProps, OverlayArrow, Tooltip as AriaTooltip, TooltipProps as AriaTooltipProps, TooltipTrigger } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { cardStyles } from "./card";

// styles

const tooltipStyles = tv({
  base: cardStyles().base({ className: "p-2" }),
});

// props

interface TooltipProps extends AriaTooltipProps {
  hideArrow?: boolean;
  arrowSize?: number;
}

// component

function _Tooltip(props: TooltipProps, ref: ForwardedRef<HTMLDivElement>) {
  const { hideArrow = false, arrowSize = 16 } = props;

  return (
    <AriaTooltip
      ref={ref}
      offset={16}
      {...props}
      className={composeRenderProps(props.className, (className, { isEntering, isExiting, placement }) =>
        tooltipStyles({
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
            }[placement],
            className,
          ),
        }),
      )}
    >
      {composeRenderProps(props.children, (children, { placement }) => (
        <>
          {!hideArrow && (
            <OverlayArrow>
              <svg
                viewBox="0 0 8 8"
                width={arrowSize}
                height={arrowSize}
                className={twMerge(
                  "fill-default-0 stroke-default-1000/20 stroke-[.25px]",
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

function TriggerWrapperWithoutDiv({ children }: { children: ReactElement }) {
  const triggerRef = useRef(null);
  const { buttonProps } = useButton({}, triggerRef);

  return cloneElement(children, mergeProps(buttonProps, children.props, { ref: triggerRef }));
}

// exports

export { Tooltip, TriggerWrapperWithoutDiv, TooltipTrigger };
