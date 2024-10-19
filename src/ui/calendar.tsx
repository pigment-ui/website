"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps, useField } from "react-aria";
import {
  Button,
  Calendar as AriaCalendar,
  CalendarCell,
  CalendarGrid,
  CalendarProps as AriaCalendarProps,
  composeRenderProps,
  DateValue,
  FieldErrorContext,
  Heading,
  Provider,
  TextContext,
} from "react-aria-components";
import { FormValidationProps, useFormValidationState } from "@react-stately/form";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { StyleSlotsToStyleProps } from "./types";

import { cardStyles } from "./card";
import { Field, FieldBaseProps } from "./field";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

// styles

const calendarStyles = tv({
  slots: {
    base: "",
    wrapper: cardStyles().base({ className: "p-4 w-fit max-w-full overflow-auto" }),
    header: "flex items-center justify-between",
    heading: "font-medium",
    button: [
      "grid place-items-center duration-300 rounded-lg",
      "data-[hovered]:bg-default-200 data-[pressed]:scale-90",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      "outline-none data-[focus-visible]:outline data-[focus-visible]:outline-default-1000 data-[focus-visible]:z-10",
    ],
    gridWrapper: "flex gap-4",
    grid: "border-separate border-spacing-1 h-fit [&_th]:text-default-700 [&_th]:font-light [&_th]:p-0 [&_td]:p-0",
    cell: [
      "grid place-items-center duration-300 rounded-lg relative z-0",
      "data-[hovered]:bg-default-200 data-[pressed]:scale-90",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      "outline-none data-[focus-visible]:outline data-[focus-visible]:outline-default-1000 data-[focus-visible]:z-10",
      "data-[selected]:bg-default-1000 data-[selected]:text-default-0 data-[invalid]:bg-error-500",
      "data-[unavailable]:line-through data-[unavailable]:text-error-500 data-[unavailable]:data-[invalid]:text-default-0",
      "data-[outside-month]:hidden",
    ],
  },
  variants: {
    size: {
      sm: { heading: "text-sm", button: "size-6 [&>svg]:size-3", grid: "[&_th]:text-xs [&_th]:size-7 mt-3", cell: "text-xs size-7" },
      md: { heading: "text-base", button: "size-7 [&>svg]:size-4", grid: "[&_th]:text-sm [&_th]:size-8 mt-4", cell: "text-sm size-8" },
      lg: { heading: "text-lg", button: "size-8 [&>svg]:size-5", grid: "[&_th]:text-base [&_th]:size-9 mt-5", cell: "text-base size-9" },
    },
  },
});

type CalendarStylesReturnType = ReturnType<typeof calendarStyles>;

// props

interface CalendarProps<T extends DateValue>
  extends Omit<AriaCalendarProps<T>, "visibleDuration">,
    Omit<FormValidationProps<T | null | undefined>, "value" | "builtinValidation">,
    FieldBaseProps,
    StyleSlotsToStyleProps<CalendarStylesReturnType> {
  visibleMonthCount?: number;
}

// component

function _Calendar<T extends DateValue>(props: CalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { visibleMonthCount = 1, value, size = "md", classNames, styles } = props;

  const { displayValidation } = useFormValidationState({ ...props, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...props });

  const styleSlots = calendarStyles({ size });

  return (
    <Provider
      values={[
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, displayValidation],
      ]}
    >
      <AriaCalendar
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
                  {(date) => <CalendarCell date={date} className={styleSlots.cell({ className: classNames?.cell })} style={styles?.cell} />}
                </CalendarGrid>
              ))}
            </div>
          </div>
        </Field>
      </AriaCalendar>
    </Provider>
  );
}

const Calendar = forwardRef(_Calendar);

// exports

export { Calendar, calendarStyles };
