"use client";

import { ColorProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { composeRenderProps, Label, ProgressBar as AriaProgressBar, ProgressBarProps as AriaProgressBarProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const progressBarStyles = tv({
  slots: {
    base: "text-default",
    wrapper: "flex flex-col",
    labelWrapper: "",
    label: "",
    valueText: "duration-300",
    trackWrapper: "relative",
    track: "",
    filler: "",
  },
  variants: {
    color: {
      default: "",
      primary: "",
      secondary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    size: {
      sm: { label: "text-xs", valueText: "text-xs", wrapper: "gap-y-0.5" },
      md: { label: "text-sm", valueText: "text-sm", wrapper: "gap-y-1" },
      lg: { label: "text-base", valueText: "text-base", wrapper: "gap-y-1.5" },
    },
    isCircular: {
      false: {
        labelWrapper: "flex justify-between",
        valueText: "",
        track: "relative overflow-hidden rounded-full",
        filler: "absolute inset-y-0 left-0 rounded-full",
      },
      true: {
        wrapper: "size-fit items-center",
        labelWrapper: "order-last",
        valueText: "absolute",
        trackWrapper: "grid place-items-center text-center",
        track: "fill-none stroke-2",
      },
    },
    isIndeterminate: { true: {}, false: { filler: "duration-1000" } },
  },
  compoundVariants: [
    { isCircular: false, color: "default", className: { track: "bg-default/10", filler: "bg-default" } },
    { isCircular: false, color: "primary", className: { track: "bg-primary/10", filler: "bg-primary" } },
    { isCircular: false, color: "secondary", className: { track: "bg-secondary/10", filler: "bg-secondary" } },
    { isCircular: false, color: "info", className: { track: "bg-info/10", filler: "bg-info" } },
    { isCircular: false, color: "success", className: { track: "bg-success/10", filler: "bg-success" } },
    { isCircular: false, color: "warning", className: { track: "bg-warning/10", filler: "bg-warning" } },
    { isCircular: false, color: "error", className: { track: "bg-error/10", filler: "bg-error" } },
    { isCircular: true, size: "sm", className: { track: "size-12" } },
    { isCircular: true, size: "md", className: { track: "size-16" } },
    { isCircular: true, size: "lg", className: { track: "size-20" } },

    { isCircular: true, color: "default", className: { track: "stroke-default/10", filler: "stroke-default" } },
    { isCircular: true, color: "primary", className: { track: "stroke-primary/10", filler: "stroke-primary" } },
    { isCircular: true, color: "secondary", className: { track: "stroke-secondary/10", filler: "stroke-secondary" } },
    { isCircular: true, color: "info", className: { track: "stroke-info/10", filler: "stroke-info" } },
    { isCircular: true, color: "success", className: { track: "stroke-success/10", filler: "stroke-success" } },
    { isCircular: true, color: "warning", className: { track: "stroke-warning/10", filler: "stroke-warning" } },
    { isCircular: true, color: "error", className: { track: "stroke-error/10", filler: "stroke-error" } },
    { isCircular: false, size: "sm", className: { track: "h-1" } },
    { isCircular: false, size: "md", className: { track: "h-2" } },
    { isCircular: false, size: "lg", className: { track: "h-3" } },

    {
      isIndeterminate: true,
      isCircular: false,
      className: { filler: "-left-1/4 ease-linear animate-out slide-out-to-right-[500%] repeat-infinite [animation-duration:2s]" },
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
  label?: ReactNode;
  hideValueText?: boolean;
  isCircular?: boolean;
}

// component

const center = 16;
const strokeWidth = 2;
const r = 16 - strokeWidth;
const c = 2 * r * Math.PI;

function _ProgressBar(props: ProgressBarProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", label, hideValueText, isCircular = false, isIndeterminate = false, classNames, styles } = props;

  const styleSlots = progressBarStyles({ color, size, isCircular, isIndeterminate });

  const renderValueText = (valueText?: string) =>
    !hideValueText && (
      <span className={styleSlots.valueText({ className: classNames?.valueText })} style={styles?.valueText}>
        {valueText}
      </span>
    );

  return (
    <AriaProgressBar
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className) => styleSlots.base({ className: twMerge(classNames?.base, className) }))}
      style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
    >
      {({ percentage = 0, valueText, isIndeterminate: isIndeterminateInline }) => (
        <div className={styleSlots.wrapper({ className: classNames?.wrapper })} style={styles?.wrapper}>
          {((isCircular && !!label) || (!isCircular && (!!label || !hideValueText))) && (
            <div className={styleSlots.labelWrapper({ className: classNames?.labelWrapper })} style={styles?.labelWrapper}>
              {!!label && (
                <Label className={styleSlots.label({ className: classNames?.label })} style={styles?.label}>
                  {label}
                </Label>
              )}
              {!isCircular && renderValueText(valueText)}
            </div>
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
            {isCircular && renderValueText(valueText)}
          </div>
        </div>
      )}
    </AriaProgressBar>
  );
}

const ProgressBar = forwardRef(_ProgressBar);

// exports

export { ProgressBar };
