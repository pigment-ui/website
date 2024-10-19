"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps, useField } from "react-aria";
import {
  Button,
  CalendarCell,
  CalendarGrid,
  composeRenderProps,
  DateValue,
  FieldErrorContext,
  Heading,
  Provider,
  RangeCalendar as AriaRangeCalendar,
  RangeCalendarProps as AriaRangeCalendarProps,
  TextContext,
} from "react-aria-components";
import { FormValidationProps, useFormValidationState } from "@react-stately/form";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";
import { useLocale } from "@react-aria/i18n";
import { RangeValue } from "@react-types/shared";
import { getDayOfWeek } from "@internationalized/date";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { StyleSlotsToStyleProps } from "./types";

import { calendarStyles } from "./calendar";
import { Field, FieldBaseProps } from "./field";

// styles

const rangeCalendarStyles = tv({
  extend: calendarStyles,
  slots: {
    cell: [
      "data-[selected]:bg-opacity-0 data-[selected]:text-default-1000",
      "data-[selected]:before:absolute data-[selected]:before:-z-10 data-[selected]:before:inset-y-0 data-[selected]:before:-inset-x-0.5 data-[selected]:before:bg-default-200",
      "data-[selection-start]:bg-opacity-100 data-[selection-start]:text-default-0",
      "data-[selection-end]:bg-opacity-100 data-[selection-end]:text-default-0",
      "data-[selection-start]:rounded-r-none data-[selection-start]:before:left-full",
      "data-[selection-end]:rounded-l-none data-[selection-end]:before:right-full",
      "data-[selection-start]:data-[selection-end]:rounded-lg",
    ],
  },
  variants: {
    isFirstDay: { true: { cell: "data-[selected]:before:rounded-l-lg data-[selected]:before:left-0" } },
    isLastDay: { true: { cell: "data-[selected]:before:rounded-r-lg data-[selected]:before:right-0" } },
  },
});

type RangeCalendarStylesReturnType = ReturnType<typeof rangeCalendarStyles>;

// props

interface RangeCalendarProps<T extends DateValue>
  extends Omit<AriaRangeCalendarProps<T>, "visibleDuration">,
    Omit<FormValidationProps<RangeValue<T> | null | undefined>, "value" | "builtinValidation">,
    FieldBaseProps,
    StyleSlotsToStyleProps<RangeCalendarStylesReturnType> {
  visibleMonthCount?: number;
}

// component

function _RangeCalendar<T extends DateValue>(props: RangeCalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { visibleMonthCount = 1, value, size = "md", classNames, styles } = props;

  const { displayValidation } = useFormValidationState({ ...props, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...props });

  const styleSlots = rangeCalendarStyles({ size });

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
        aria-label={props["aria-label"] ?? props.label}
        aria-describedby={props["aria-describedby"] ?? props.description}
        visibleDuration={{ months: visibleMonthCount }}
        className={composeRenderProps(props.className, (className) => styleSlots.base({ className: twMerge(classNames?.base, className) }))}
        style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
      >
        <Field {...displayValidation} {...props}>
          <div className={styleSlots.wrapper({ className: classNames?.wrapper })} style={styles?.wrapper}>
            <header className={styleSlots.header({ className: classNames?.header })} style={styles?.header}>
              <Button slot="previous" className={styleSlots.button({ className: classNames?.button })} style={styles?.button}>
                <ChevronLeftIcon />
              </Button>
              <Heading className={styleSlots.heading({ className: classNames?.heading })} style={styles?.heading} />
              <Button slot="next" className={styleSlots.button({ className: classNames?.button })} style={styles?.button}>
                <ChevronRightIcon />
              </Button>
            </header>
            <div className={styleSlots.gridWrapper({ className: classNames?.gridWrapper })} style={styles?.gridWrapper}>
              {Array.from({ length: visibleMonthCount }).map((_, index) => (
                <CalendarGrid
                  key={index}
                  offset={{ months: index }}
                  className={styleSlots.grid({ className: classNames?.grid })}
                  style={styles?.grid}
                >
                  {(date) => (
                    <CalendarCell
                      date={date}
                      className={styleSlots.cell({
                        isFirstDay: getDayOfWeek(date, locale) === 0,
                        isLastDay: getDayOfWeek(date, locale) === 6,
                        className: classNames?.cell,
                      })}
                      style={styles?.cell}
                    />
                  )}
                </CalendarGrid>
              ))}
            </div>
          </div>
        </Field>
      </AriaRangeCalendar>
    </Provider>
  );
}

const RangeCalendar = forwardRef(_RangeCalendar);

// exports

export { RangeCalendar };
