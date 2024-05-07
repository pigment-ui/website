"use client";

import { ForwardedRef, forwardRef } from "react";
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
import { FormValidationProps, useFormValidationState } from "@react-stately/form";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants } from "./styles";
import { ContentProps, RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";

import { Field, FieldBaseProps } from "./field";

// styles

const sliderStyles = tv({
  slots: {
    base: "",
    output: "absolute top-0 right-0",
    sliderWrapper: "relative h-full w-full",
    contentWrapper: "flex items-center",
    trackWrapper: "flex-1 relative",
    track: "bg-default-1000/20 cursor-pointer duration-300",
    thumbWrapper: "absolute",
    thumb: "bg-default-0 border-2 border-default-1000 z-20 [transition:width_300ms,height_300ms,border-color_300ms;]",
    filler: "absolute bg-default-1000 [transition:background-color_300ms;]",
    stepsWrapper: "absolute flex items-center justify-between pointer-events-none",
    step: "bg-default-0 z-10",
    marksWrapper: "",
    mark: "",
  },
  variants: {
    orientation: {
      horizontal: {
        base: "w-full",
        track: "w-full",
        thumbWrapper: "inset-y-0",
        thumb: "top-1/2 -translate-y-1/2",
        filler: "inset-y-0",
        contentWrapper: "flex-row w-full",
        stepsWrapper: "flex-row inset-y-0",
        step: "w-px",
      },
      vertical: {
        base: "h-full",
        track: "h-full",
        thumbWrapper: "inset-x-0",
        thumb: "left-1/2 -translate-x-1/2",
        filler: "inset-x-0",
        contentWrapper: "flex-col h-full",
        stepsWrapper: "flex-col inset-x-0",
        step: "h-px",
      },
    },
    size: {
      sm: { output: "text-xs", mark: "text-xs", contentWrapper: "gap-2 [&_svg]:size-4", thumb: "size-4" },
      md: { output: "text-sm", mark: "text-sm", contentWrapper: "gap-2.5 [&_svg]:size-5", thumb: "size-5" },
      lg: { output: "text-base", mark: "text-base", contentWrapper: "gap-3 [&_svg]:size-6", thumb: "size-6" },
    },
    radius: {
      sm: { track: smallRadiusVariants.radius.sm, thumb: smallRadiusVariants.radius.sm, filler: smallRadiusVariants.radius.sm },
      md: { track: smallRadiusVariants.radius.md, thumb: smallRadiusVariants.radius.md, filler: smallRadiusVariants.radius.md },
      lg: { track: smallRadiusVariants.radius.lg, thumb: smallRadiusVariants.radius.lg, filler: smallRadiusVariants.radius.lg },
      full: { track: smallRadiusVariants.radius.full, thumb: smallRadiusVariants.radius.full, filler: smallRadiusVariants.radius.full },
      none: { track: smallRadiusVariants.radius.none, thumb: smallRadiusVariants.radius.none, filler: smallRadiusVariants.radius.none },
    },
    isInvalid: { true: { track: "bg-error-500/20", thumb: "border-error-500", filler: "bg-error-500" } },
    isDisabled: { true: { track: isDisabledVariants.isDisabled.true } },
    isHovered: { true: { thumb: "cursor-grab" } },
    isDragging: { true: { thumb: "cursor-grabbing" } },
    isFocusVisible: { true: { thumb: isFocusVisibleVariants.isFocusVisible.true }, false: { thumb: isFocusVisibleVariants.isFocusVisible.false } },
    hideThumb: { true: { track: "overflow-hidden", thumb: "opacity-0", filler: "rounded-none" } },
  },
  compoundVariants: [
    { orientation: "horizontal", size: "sm", className: { trackWrapper: "py-2", track: "h-1", step: "h-1", thumbWrapper: "inset-x-2" } },
    { orientation: "horizontal", size: "md", className: { trackWrapper: "py-3", track: "h-2", step: "h-2", thumbWrapper: "inset-x-2.5" } },
    { orientation: "horizontal", size: "lg", className: { trackWrapper: "py-4", track: "h-3", step: "h-3", thumbWrapper: "inset-x-3" } },
    { orientation: "vertical", size: "sm", className: { trackWrapper: "px-2", track: "w-1", step: "w-1", thumbWrapper: "inset-y-2" } },
    { orientation: "vertical", size: "md", className: { trackWrapper: "px-3", track: "w-2", step: "w-2", thumbWrapper: "inset-y-2.5" } },
    { orientation: "vertical", size: "lg", className: { trackWrapper: "px-4", track: "w-3", step: "w-3", thumbWrapper: "inset-y-3" } },

    { orientation: "horizontal", size: "sm", className: { stepsWrapper: "inset-x-2" } },
    { orientation: "horizontal", size: "md", className: { stepsWrapper: "inset-x-2.5" } },
    { orientation: "horizontal", size: "lg", className: { stepsWrapper: "inset-x-3" } },
    { orientation: "vertical", size: "sm", className: { stepsWrapper: "inset-y-2" } },
    { orientation: "vertical", size: "md", className: { stepsWrapper: "inset-y-2.5" } },
    { orientation: "vertical", size: "lg", className: { stepsWrapper: "inset-y-3" } },

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

  const styleSlots = sliderStyles({ orientation, hideThumb, size, radius, isInvalid: displayValidation.isInvalid });

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
                                state.values.length === 1
                                  ? -{
                                      sm: 8,
                                      md: 10,
                                      lg: 12,
                                    }[size]
                                  : `${state.getThumbPercent(0) * 100}%`,
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
                      {Array.from({ length: (state.getThumbMaxValue(0) - state.getThumbMinValue(0)) / state.step + 1 }).map((_, i) => (
                        <div key={i} className={styleSlots.step({ className: classNames?.step })} style={styles?.step} />
                      ))}
                    </div>
                  )}
                </div>

                {endContent}
              </div>

              <div className="relative"></div>
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
export type { SliderProps };
