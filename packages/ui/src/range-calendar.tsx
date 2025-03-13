"use client";

import { calendarStyles, CalendarWrapper } from "./calendar";
import { Field, FieldBaseProps } from "./field";
import { useGlobalProps } from "./provider";
import { ColorProps, RadiusProps, StyleSlotsToStyleProps } from "./types";
import { getDayOfWeek } from "@internationalized/date";
import { useLocale } from "@react-aria/i18n";
import { FormValidationProps, useFormValidationState } from "@react-stately/form";
import { RangeValue } from "@react-types/shared";
import React, { ForwardedRef, forwardRef } from "react";
import { mergeProps, useField } from "react-aria";
import {
  CalendarCell,
  CalendarGrid,
  composeRenderProps,
  DateValue,
  FieldErrorContext,
  Provider,
  RangeCalendar as AriaRangeCalendar,
  RangeCalendarProps as AriaRangeCalendarProps,
  TextContext,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const rangeCalendarStyles = tv({
  extend: calendarStyles,
  base: "",
  variants: {
    color: { default: "", primary: "", secondary: "", info: "", success: "", warning: "", error: "" },
    variant: { solid: "", soft: "", light: "", bordered: "", outlined: "", ghost: "", faded: "", card: "" },
    isHovered: { true: "" },
    isPressed: { true: "" },
    isDisabled: { true: "" },
    isFocusVisible: { true: "" },

    isSelectedRange: { true: "" },
    isSelectionStart: { true: "" },
    isSelectionEnd: { true: "" },
    isSelectedFirstDay: { true: "!rounded-r-none" },
    isSelectedLastDay: { true: "!rounded-l-none" },
  },
  compoundVariants: [
    { isSelectionStart: true, isSelectionEnd: false, className: "!rounded-r-none" },
    { isSelectionStart: false, isSelectionEnd: true, className: "!rounded-l-none" },
    { isSelectedRange: true, isSelectedFirstDay: false, isSelectedLastDay: false, className: "!rounded-none" },
  ],
});

type RangeCalendarStylesReturnType = ReturnType<typeof rangeCalendarStyles>;

// props

interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, "visibleDuration">,
    Omit<FormValidationProps<RangeValue<T> | null | undefined>, "value" | "builtinValidation">,
    ColorProps,
    RadiusProps,
    FieldBaseProps,
    StyleSlotsToStyleProps<RangeCalendarStylesReturnType> {
  visibleMonthCount?: number;
  asCard?: boolean;
}

// component

function _RangeCalendar<T extends DateValue>(props: RangeCalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("RangeCalendar", props, {
    color: "default",
    visibleMonthCount: 1,
    asCard: true,
    size: "md",
    radius: props.size || "md",
  });

  const { color, visibleMonthCount, asCard, value, size, radius, classNames, styles } = globalProps;

  const { displayValidation } = useFormValidationState({ ...globalProps, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...globalProps });

  const styleSlots = rangeCalendarStyles({ asCard, size, radius });

  const { locale } = useLocale();

  return (
    <Provider
      values={[
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, displayValidation],
      ]}
    >
      <AriaRangeCalendar
        ref={ref}
        {...mergeProps(globalProps, fieldProps)}
        aria-label={globalProps["aria-label"] ?? (typeof globalProps.label === "string" ? globalProps.label : undefined)}
        aria-describedby={globalProps["aria-describedby"] ?? (typeof globalProps.description === "string" ? globalProps.description : undefined)}
        visibleDuration={{ months: visibleMonthCount }}
        className={composeRenderProps(globalProps.className, (className) =>
          styleSlots.wrapper({ className: twMerge(classNames?.wrapper, className) }),
        )}
        style={composeRenderProps(globalProps.style, (style) => mergeProps(styles?.wrapper, style))}
      >
        <Field {...displayValidation} {...globalProps}>
          <CalendarWrapper styleSlots={styleSlots} classNames={classNames} styles={styles}>
            {Array.from({ length: visibleMonthCount }).map((_, index) => (
              <CalendarGrid key={index} offset={{ months: index }} className={styleSlots.grid({ className: classNames?.grid })} style={styles?.grid}>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={({
                      isHovered,
                      isPressed,
                      isDisabled,
                      isFocusVisible,
                      isSelected,
                      isInvalid,
                      isUnavailable,
                      isOutsideMonth,
                      isSelectionStart,
                      isSelectionEnd,
                    }) =>
                      styleSlots.base({
                        color: isUnavailable ? "error" : isSelected ? (isInvalid ? "error" : color) : "default",
                        variant: isSelected ? (isSelectionStart || isSelectionEnd ? "solid" : "soft") : "light",
                        isHovered,
                        isPressed,
                        isDisabled: isDisabled || isUnavailable,
                        isFocusVisible,
                        isUnavailable,
                        isOutsideMonth,
                        isSelectionStart,
                        isSelectionEnd,
                        isSelectedRange: isSelected && !(isSelectionStart || isSelectionEnd),
                        isSelectedFirstDay: isSelected && getDayOfWeek(date, locale) === 0,
                        isSelectedLastDay: isSelected && getDayOfWeek(date, locale) === 6,
                        className: classNames?.base,
                      })
                    }
                    style={styles?.base}
                  />
                )}
              </CalendarGrid>
            ))}
          </CalendarWrapper>
        </Field>
      </AriaRangeCalendar>
    </Provider>
  );
}

const RangeCalendar = forwardRef(_RangeCalendar);

// exports

export { RangeCalendar };
