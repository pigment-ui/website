"use client";

import { Field, FieldBaseProps } from "./field";
import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants } from "./styles";
import { ContentProps, RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import { FormValidationProps, useFormValidationState } from "@react-stately/form";
import React, { ForwardedRef, forwardRef } from "react";
import { mergeProps, useField } from "react-aria";
import {
  composeRenderProps,
  FieldErrorContext,
  Provider,
  Slider as AriaSlider,
  SliderOutput,
  SliderProps as AriaSliderProps,
  SliderThumb,
  SliderTrack,
  TextContext,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const sliderStyles = tv({
  slots: {
    base: "",
    output: "absolute right-0 top-0",
    sliderWrapper: "relative size-full",
    contentWrapper: "flex items-center",
    trackWrapper: "relative flex-1",
    track: "cursor-pointer bg-default-1000/20 duration-300",
    thumbWrapper: "absolute",
    thumb: "z-20 border-2 border-default-1000 bg-default-0 [transition:width_300ms,height_300ms,border-color_300ms;]",
    filler: "absolute bg-default-1000 [transition:background-color_300ms;]",
    stepsWrapper: "pointer-events-none absolute flex items-center justify-between",
    step: "z-10 bg-default-0",
    marksWrapper: "absolute",
    mark: "absolute",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "w-full",
        track: "w-full",
        thumbWrapper: "inset-y-0",
        thumb: "top-1/2 -translate-y-1/2",
        filler: "inset-y-0",
        contentWrapper: "w-full flex-row",
        stepsWrapper: "inset-y-0 flex-row",
        step: "w-px",
        marksWrapper: "top-full",
        mark: "-translate-x-1/2",
      },
      vertical: {
        base: "h-full",
        track: "h-full",
        thumbWrapper: "inset-x-0",
        thumb: "left-1/2 -translate-x-1/2",
        filler: "inset-x-0",
        contentWrapper: "h-full flex-col",
        stepsWrapper: "inset-x-0 flex-col",
        step: "h-px",
        marksWrapper: "left-full",
        mark: "translate-y-1/2",
      },
    },
    size: {
      sm: { output: "text-xs", mark: "text-xs", contentWrapper: "gap-2 [&_svg]:size-4", thumb: "size-4" },
      md: { output: "text-sm", mark: "text-sm", contentWrapper: "gap-2.5 [&_svg]:size-5", thumb: "size-5" },
      lg: { output: "text-base", mark: "text-base", contentWrapper: "gap-3 [&_svg]:size-6", thumb: "size-6" },
    },
    radius: {
      sm: { track: smallRadiusVariants.sm, thumb: smallRadiusVariants.sm, filler: smallRadiusVariants.sm },
      md: { track: smallRadiusVariants.md, thumb: smallRadiusVariants.md, filler: smallRadiusVariants.md },
      lg: { track: smallRadiusVariants.lg, thumb: smallRadiusVariants.lg, filler: smallRadiusVariants.lg },
      full: { track: smallRadiusVariants.full, thumb: smallRadiusVariants.full, filler: smallRadiusVariants.full },
      none: { track: smallRadiusVariants.none, thumb: smallRadiusVariants.none, filler: smallRadiusVariants.none },
    },
    isInvalid: { true: { track: "bg-error-500/20", thumb: "border-error-500", filler: "bg-error-500" } },
    isDisabled: { true: { track: isDisabledVariants.true } },
    isHovered: { true: { thumb: "cursor-grab" } },
    isDragging: { true: { thumb: "cursor-grabbing" } },
    isFocusVisible: { true: { thumb: isFocusVisibleVariants.true }, false: { thumb: isFocusVisibleVariants.false } },
    hideThumb: { true: { track: "overflow-hidden", thumb: "opacity-0", filler: "rounded-none" } },
    hasMarks: { true: "" },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      className: {
        trackWrapper: "py-2",
        track: "h-1",
        step: "h-1",
        thumbWrapper: "inset-x-2",
        stepsWrapper: "inset-x-2",
        marksWrapper: "inset-x-2",
      },
    },
    {
      orientation: "horizontal",
      size: "md",
      className: {
        trackWrapper: "py-3",
        track: "h-2",
        step: "h-2",
        thumbWrapper: "inset-x-2.5",
        stepsWrapper: "inset-x-2.5",
        marksWrapper: "inset-x-2.5",
      },
    },
    {
      orientation: "horizontal",
      size: "lg",
      className: {
        trackWrapper: "py-4",
        track: "h-3",
        step: "h-3",
        thumbWrapper: "inset-x-3",
        stepsWrapper: "inset-x-3",
        marksWrapper: "inset-x-3",
      },
    },
    {
      orientation: "vertical",
      size: "sm",
      className: {
        trackWrapper: "px-2",
        track: "w-1",
        step: "w-1",
        thumbWrapper: "inset-y-2",
        stepsWrapper: "inset-y-2",
        marksWrapper: "inset-y-2",
      },
    },
    {
      orientation: "vertical",
      size: "md",
      className: {
        trackWrapper: "px-3",
        track: "w-2",
        step: "w-2",
        thumbWrapper: "inset-y-2.5",
        stepsWrapper: "inset-y-2.5",
        marksWrapper: "inset-y-2.5",
      },
    },
    {
      orientation: "vertical",
      size: "lg",
      className: {
        trackWrapper: "px-4",
        track: "w-3",
        step: "w-3",
        thumbWrapper: "inset-y-3",
        stepsWrapper: "inset-y-3",
        marksWrapper: "inset-y-3",
      },
    },

    { orientation: "horizontal", hasMarks: true, size: "sm", className: { sliderWrapper: "pb-4" } },
    { orientation: "horizontal", hasMarks: true, size: "md", className: { sliderWrapper: "pb-5" } },
    { orientation: "horizontal", hasMarks: true, size: "lg", className: { sliderWrapper: "pb-6" } },

    { orientation: "horizontal", hideThumb: true, className: { thumbWrapper: "inset-x-0" } },
    { orientation: "vertical", hideThumb: true, className: { thumbWrapper: "inset-y-0" } },

    { size: "sm", isDragging: true, className: { thumb: "size-5" } },
    { size: "md", isDragging: true, className: { thumb: "size-6" } },
    { size: "lg", isDragging: true, className: { thumb: "size-7" } },
  ],
});

type SliderStylesReturnType = ReturnType<typeof sliderStyles>;

// props

interface SliderProps
  extends AriaSliderProps,
    Omit<FormValidationProps<number | number[] | undefined>, "value" | "builtinValidation">,
    FieldBaseProps,
    SizeProps,
    RadiusProps,
    ContentProps,
    StyleSlotsToStyleProps<SliderStylesReturnType> {
  hideThumb?: boolean;
  thumbLabels?: string[];
  showSteps?: boolean;
  marks?: { value: number; label: string }[];
}

// component

function _Slider(props: SliderProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    value,
    hideThumb = false,
    thumbLabels,
    showSteps = false,
    marks,
    orientation = "horizontal",
    size = "md",
    radius = "full",
    startContent,
    endContent,
    classNames,
    styles,
  } = props;

  const { displayValidation } = useFormValidationState({ ...props, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...props });

  const styleSlots = sliderStyles({ orientation, hideThumb, size, radius, hasMarks: !!marks, isInvalid: displayValidation.isInvalid });

  return (
    <Provider
      values={[
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, displayValidation],
      ]}
    >
      <AriaSlider
        ref={ref}
        {...mergeProps(props, fieldProps)}
        className={composeRenderProps(props.className, (className) => styleSlots.base({ className: twMerge(classNames?.base, className) }))}
        style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
      >
        {({ state }) => (
          <Field {...displayValidation} {...props}>
            {props.label && (
              <SliderOutput className={styleSlots.output({ className: classNames?.output })} style={styles?.output}>
                {({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(" – ")}
              </SliderOutput>
            )}

            <div className={styleSlots.sliderWrapper({ className: classNames?.sliderWrapper })} style={styles?.sliderWrapper}>
              <div className={styleSlots.contentWrapper({ className: classNames?.contentWrapper })} style={styles?.contentWrapper}>
                {startContent}

                <div className={styleSlots.trackWrapper({ className: classNames?.trackWrapper })} style={styles?.trackWrapper}>
                  <SliderTrack className={({ isDisabled }) => styleSlots.track({ isDisabled, className: classNames?.track })} style={styles?.track}>
                    {({ state }) => (
                      <div className={styleSlots.thumbWrapper({ className: classNames?.thumbWrapper })} style={styles?.thumbWrapper}>
                        {state.values.map((_, i) => (
                          <SliderThumb
                            key={i}
                            index={i}
                            aria-label={thumbLabels?.[i]}
                            className={({ isHovered, isDragging, isFocusVisible }) =>
                              styleSlots.thumb({ isHovered, isDragging, isFocusVisible, className: classNames?.thumb })
                            }
                            style={styles?.thumb}
                          />
                        ))}

                        <div
                          className={styleSlots.filler({ className: classNames?.filler })}
                          style={mergeProps(
                            {
                              [orientation === "horizontal" ? "left" : "bottom"]:
                                state.values.length === 1 ? -{ sm: 8, md: 10, lg: 12 }[size] : `${state.getThumbPercent(0) * 100}%`,
                              [orientation === "horizontal" ? "right" : "top"]:
                                state.values.length === 1 ? `${100 - state.getThumbPercent(0) * 100}%` : `${100 - state.getThumbPercent(1) * 100}%`,
                            },
                            styles?.filler,
                          )}
                        />
                      </div>
                    )}
                  </SliderTrack>

                  {showSteps && (
                    <div className={styleSlots.stepsWrapper({ className: classNames?.stepsWrapper })} style={styles?.stepsWrapper}>
                      {Array.from({
                        length:
                          ((state.values.length === 1 ? state.getThumbMaxValue(0) : state.getThumbMaxValue(1)) - state.getThumbMinValue(0)) /
                            state.step +
                          1,
                      }).map((_, i) => (
                        <div key={i} className={styleSlots.step({ className: classNames?.step })} style={styles?.step} />
                      ))}
                    </div>
                  )}

                  {marks && (
                    <div className={styleSlots.marksWrapper({ className: classNames?.marksWrapper })} style={styles?.marksWrapper}>
                      {marks.map((mark, i) => (
                        <div
                          key={i}
                          className={styleSlots.mark({ className: classNames?.mark })}
                          style={mergeProps(
                            { [orientation === "horizontal" ? "left" : "bottom"]: `${state.getValuePercent(mark.value) * 100}%` },
                            styles?.mark,
                          )}
                        >
                          {mark.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {endContent}
              </div>
            </div>
          </Field>
        )}
      </AriaSlider>
    </Provider>
  );
}

const Slider = forwardRef(_Slider);

// exports

export { Slider };
