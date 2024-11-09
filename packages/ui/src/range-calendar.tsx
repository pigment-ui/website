"use client";

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

import { smallRadiusVariants } from "./styles";
import { StyleSlotsToStyleProps } from "./types";

import { calendarStyles, CalendarWrapper } from "./calendar";
import { Field, FieldBaseProps } from "./field";

// styles

const rangeCalendarStyles = tv({
  extend: calendarStyles,
  variants: {
    isSelectionStart: { true: { cell: "rounded-r-none" } },
    isSelectionEnd: { true: { cell: "rounded-l-none" } },
    isSelectedRange: {
      true: {
        cell: ["!bg-transparent !text-default-1000", "before:absolute before:-inset-x-1 before:inset-y-0 before:-z-10 before:bg-default-200"],
      },
    },
    isSelectedFirstDay: { true: { cell: [smallRadiusVariants.md, "overflow-hidden rounded-r-none"] } },
    isSelectedLastDay: { true: { cell: [smallRadiusVariants.md, "overflow-hidden rounded-l-none"] } },
  },
  compoundVariants: [{ isSelectionStart: true, isSelectionEnd: true, className: { cell: smallRadiusVariants.md } }],
});

type RangeCalendarStylesReturnType = ReturnType<typeof rangeCalendarStyles>;

// props

interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, "visibleDuration">,
    Omit<FormValidationProps<RangeValue<T> | null | undefined>, "value" | "builtinValidation">,
    FieldBaseProps,
    StyleSlotsToStyleProps<RangeCalendarStylesReturnType> {
  visibleMonthCount?: number;
  asCard?: boolean;
}

// component

function _RangeCalendar<T extends DateValue>(props: RangeCalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { visibleMonthCount = 1, asCard = true, value, size = "md", classNames, styles } = props;

  const { displayValidation } = useFormValidationState({ ...props, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...props });

  const styleSlots = rangeCalendarStyles({ asCard, size });

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
        {...mergeProps(props, fieldProps)}
        aria-label={props["aria-label"] ?? (typeof props.label === "string" ? props.label : undefined)}
        aria-describedby={props["aria-describedby"] ?? (typeof props.description === "string" ? props.description : undefined)}
        visibleDuration={{ months: visibleMonthCount }}
        className={composeRenderProps(props.className, (className) => styleSlots.base({ className: twMerge(classNames?.base, className) }))}
        style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
      >
        <Field {...displayValidation} {...props}>
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
                      styleSlots.cell({
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
                        isSelectedRange: isSelected && !(isSelectionStart || isSelectionEnd),
                        isSelectedFirstDay: isSelected && getDayOfWeek(date, locale) === 0,
                        isSelectedLastDay: isSelected && getDayOfWeek(date, locale) === 6,
                        className: classNames?.cell,
                      })
                    }
                    style={styles?.cell}
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
