"use client";

import { ForwardedRef, forwardRef, ReactNode } from "react";
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
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants } from "./styles";
import { StyleSlotsToStyleProps } from "./types";

import { cardStyles } from "./card";
import { Field, FieldBaseProps } from "./field";

// styles

const calendarStyles = tv({
  slots: {
    base: "",
    wrapper: "p-4 w-fit max-w-full overflow-auto",
    header: "flex items-center justify-between gap-4",
    heading: "font-medium",
    button: ["grid place-items-center duration-300", smallRadiusVariants.md],
    gridWrapper: "flex gap-4",
    grid: "border-separate border-spacing-1 size-fit [&_th]:text-default-700 [&_th]:font-light [&_th]:p-0 [&_td]:p-0",
    cell: ["grid place-items-center duration-300 relative z-0", smallRadiusVariants.md],
  },
  variants: {
    size: {
      sm: { heading: "text-sm", button: "size-6 [&>svg]:size-3", grid: "[&_th]:text-xs [&_th]:size-7 mt-3", cell: "text-xs size-7" },
      md: { heading: "text-base", button: "size-7 [&>svg]:size-4", grid: "[&_th]:text-sm [&_th]:size-8 mt-4", cell: "text-sm size-8" },
      lg: { heading: "text-lg", button: "size-8 [&>svg]:size-5", grid: "[&_th]:text-base [&_th]:size-9 mt-5", cell: "text-base size-9" },
    },
    asCard: {
      true: { wrapper: cardStyles().base({ hasShadow: false }) },
    },
    isHovered: {
      true: { button: "bg-default-200", cell: "bg-default-200" },
    },
    isSelected: {
      true: { cell: "bg-default-1000 text-default-0" },
    },
    isUnavailable: {
      true: { cell: "line-through text-error-500" },
    },
    isInvalid: {
      true: { cell: "bg-error-500 text-default-0" },
    },
    isOutsideMonth: {
      true: { cell: "hidden" },
    },
    isPressed: {
      true: { button: "scale-90", cell: "scale-90" },
    },
    isDisabled: {
      true: { button: isDisabledVariants.true, cell: isDisabledVariants.true },
    },
    isFocusVisible: {
      true: { button: isFocusVisibleVariants.true, cell: isFocusVisibleVariants.true },
      false: { button: isFocusVisibleVariants.false, cell: isFocusVisibleVariants.false },
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
  asCard?: boolean;
}

// component

function _Calendar<T extends DateValue>(props: CalendarProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { visibleMonthCount = 1, asCard = true, value, size = "md", classNames, styles } = props;

  const { displayValidation } = useFormValidationState({ ...props, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...props });

  const styleSlots = calendarStyles({ asCard, size });

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
          <CalendarWrapper styleSlots={styleSlots} classNames={classNames} styles={styles}>
            {Array.from({ length: visibleMonthCount }).map((_, index) => (
              <CalendarGrid key={index} offset={{ months: index }} className={styleSlots.grid({ className: classNames?.grid })} style={styles?.grid}>
                {(date) => (
                  <CalendarCell
                    date={date}
                    className={({ isHovered, isPressed, isDisabled, isFocusVisible, isSelected, isInvalid, isUnavailable, isOutsideMonth }) =>
                      styleSlots.cell({
                        isHovered,
                        isPressed,
                        isDisabled,
                        isFocusVisible,
                        isSelected,
                        isInvalid,
                        isUnavailable,
                        isOutsideMonth,
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
      </AriaCalendar>
    </Provider>
  );
}

const Calendar = forwardRef(_Calendar);

function CalendarWrapper({
  styleSlots,
  classNames,
  styles,
  children,
}: {
  styleSlots: CalendarStylesReturnType;
  classNames: CalendarProps<DateValue>["classNames"];
  styles: CalendarProps<DateValue>["styles"];
  children: ReactNode;
}) {
  return (
    <div className={styleSlots.wrapper({ className: classNames?.wrapper })} style={styles?.wrapper}>
      <div className="flex min-w-fit flex-col">
        <header className={styleSlots.header({ className: classNames?.header })} style={styles?.header}>
          <Button
            slot="previous"
            className={({ isHovered, isPressed, isDisabled, isFocusVisible }) =>
              styleSlots.button({ isHovered, isPressed, isDisabled, isFocusVisible, className: classNames?.button })
            }
            style={styles?.button}
          >
            <ChevronLeftIcon />
          </Button>

          <Heading className={styleSlots.heading({ className: classNames?.heading })} style={styles?.heading} />

          <Button
            slot="next"
            className={({ isHovered, isPressed, isDisabled, isFocusVisible }) =>
              styleSlots.button({ isHovered, isPressed, isDisabled, isFocusVisible, className: classNames?.button })
            }
            style={styles?.button}
          >
            <ChevronRightIcon />
          </Button>
        </header>

        <div className={styleSlots.gridWrapper({ className: classNames?.gridWrapper })} style={styles?.gridWrapper}>
          {children}
        </div>
      </div>
    </div>
  );
}

// exports

export { Calendar, CalendarWrapper, calendarStyles };
