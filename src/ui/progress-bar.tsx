"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, Label, ProgressBar as AriaProgressBar, ProgressBarProps as AriaProgressBarProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { ColorProps, SizeProps, StyleSlotsToStyleProps } from "./types"; // styles

// styles

const progressBarStyles = tv({
  slots: {
    base: "",
    wrapper: "flex flex-col",
    label: "",
    valueText: "absolute",
    trackWrapper: "relative",
    track: "",
    filler: "",
  },
  variants: {
    color: { default: {}, primary: {}, info: {}, success: {}, warning: {}, error: {} },
    size: {
      sm: { label: "text-xs", valueText: "text-xs", wrapper: "gap-y-0.5" },
      md: { label: "text-sm", valueText: "text-sm", wrapper: "gap-y-1" },
      lg: { label: "text-base", valueText: "text-base", wrapper: "gap-y-1.5" },
    },
    isCircular: {
      false: {
        valueText: "right-0 bottom-full",
        track: "rounded-full relative overflow-hidden",
        filler: "rounded-full absolute inset-y-0 left-0",
      },
      true: {
        wrapper: "items-center w-fit",
        label: "order-last",
        valueText: "top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 text-center",
        track: "fill-none stroke-2",
      },
    },
    isIndeterminate: { true: {}, false: { filler: "duration-1000" } },
  },
  compoundVariants: [
    { isCircular: false, color: "default", className: { track: "bg-default-1000/10", filler: "bg-default-1000" } },
    { isCircular: false, color: "primary", className: { track: "bg-primary-500/10", filler: "bg-primary-500" } },
    { isCircular: false, color: "info", className: { track: "bg-info-500/10", filler: "bg-info-500" } },
    { isCircular: false, color: "success", className: { track: "bg-success-500/10", filler: "bg-success-500" } },
    { isCircular: false, color: "warning", className: { track: "bg-warning-500/10", filler: "bg-warning-500" } },
    { isCircular: false, color: "error", className: { track: "bg-error-500/10", filler: "bg-error-500" } },
    { isCircular: false, size: "sm", className: { track: "h-1" } },
    { isCircular: false, size: "md", className: { track: "h-2" } },
    { isCircular: false, size: "lg", className: { track: "h-3" } },
    { isCircular: false, size: "sm", className: { valueText: "-translate-y-0.5" } },
    { isCircular: false, size: "md", className: { valueText: "-translate-y-1" } },
    { isCircular: false, size: "lg", className: { valueText: "-translate-y-1.5" } },

    { isCircular: true, color: "default", className: { track: "stroke-default-1000/10", filler: "stroke-default-1000" } },
    { isCircular: true, color: "primary", className: { track: "stroke-primary-500/10", filler: "stroke-primary-500" } },
    { isCircular: true, color: "info", className: { track: "stroke-info-500/10", filler: "stroke-info-500" } },
    { isCircular: true, color: "success", className: { track: "stroke-success-500/10", filler: "stroke-success-500" } },
    { isCircular: true, color: "warning", className: { track: "stroke-warning-500/10", filler: "stroke-warning-500" } },
    { isCircular: true, color: "error", className: { track: "stroke-error-500/10", filler: "stroke-error-500" } },
    { isCircular: true, size: "sm", className: { track: "size-16" } },
    { isCircular: true, size: "md", className: { track: "size-20" } },
    { isCircular: true, size: "lg", className: { track: "size-24" } },

    {
      isIndeterminate: true,
      isCircular: false,
      className: { filler: "-left-1/4 animate-out slide-out-to-right-[500%] repeat-infinite ease-linear [animation-duration:2s]" },
    },
    {
      isIndeterminate: true,
      isCircular: true,
      className: { trackWrapper: "animate-spin ease-linear [animation-duration:1s]" },
    },
  ],
});

type ProgressBarStylesReturnType = ReturnType<typeof progressBarStyles>;

// props

interface ProgressBarProps extends AriaProgressBarProps, ColorProps, SizeProps, StyleSlotsToStyleProps<ProgressBarStylesReturnType> {
  label?: string;
  isCircular?: boolean;
}

// component

const center = 16;
const strokeWidth = 2;
const r = 16 - strokeWidth;
const c = 2 * r * Math.PI;

function _ProgressBar(props: ProgressBarProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", label, isCircular = false, isIndeterminate = false, classNames, styles } = props;

  const styleSlots = progressBarStyles({ color, size, isCircular, isIndeterminate });

  return (
    <AriaProgressBar
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className) => styleSlots.base({ className: twMerge(classNames?.base, className) }))}
      style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
    >
      {({ percentage = 0, valueText, isIndeterminate: isIndeterminateInline }) => (
        <div className={styleSlots.wrapper({ className: classNames?.wrapper })} style={styles?.wrapper}>
          {!!label && (
            <Label className={styleSlots.label({ className: classNames?.label })} style={styles?.label}>
              {label}
            </Label>
          )}

          <div className={styleSlots.trackWrapper({ className: classNames?.trackWrapper })} style={styles?.trackWrapper}>
            {!isCircular ? (
              <div className={styleSlots.track({ className: classNames?.track })} style={styles?.track}>
                <div
                  className={styleSlots.filler({ className: classNames?.filler })}
                  style={mergeProps({ width: `${!isIndeterminateInline ? percentage : 25}%` }, styles?.filler)}
                />
              </div>
            ) : (
              <svg viewBox="0 0 32 32" className={styleSlots.track({ className: classNames?.track })} style={styles?.track}>
                <circle cx={center} cy={center} r={r} className={styleSlots.track({ className: classNames?.track })} style={styles?.track} />
                <circle
                  cx={center}
                  cy={center}
                  r={r}
                  strokeDasharray={`${c} ${c}`}
                  strokeDashoffset={c - ((!isIndeterminateInline ? percentage : 25) / 100) * c}
                  strokeLinecap="round"
                  transform="rotate(-90 16 16)"
                  className={styleSlots.filler({ className: classNames?.filler })}
                  style={styles?.filler}
                />
              </svg>
            )}

            {!!valueText && (
              <span className={styleSlots.valueText({ className: classNames?.valueText })} style={styles?.valueText}>
                {valueText}
              </span>
            )}
          </div>
        </div>
      )}
    </AriaProgressBar>
  );
}

const ProgressBar = forwardRef(_ProgressBar);

// exports

export { ProgressBar };
