"use client";

import { Calendar } from "./calendar";
import { FieldInput, FieldInputBaseProps, useFieldSegmentStyles } from "./field";
import { Popover } from "./popover";
import { useGlobalProps } from "./provider";
import { ForwardRefType } from "./types";
import { useObserveElementWidth } from "./utils";
import { CalendarIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import {
  Button,
  DateInput,
  DatePicker as AriaDatePicker,
  DatePickerProps as AriaDatePickerProps,
  DateSegment,
  DateValue,
  InputProps,
} from "react-aria-components";

// props

interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T>,
    Omit<InputProps, keyof AriaDatePickerProps<T> | "color" | "size">,
    Omit<ComponentPropsWithoutRef<typeof Popover>, keyof AriaDatePickerProps<T>>,
    FieldInputBaseProps {
  visibleMonthCount?: number;
}

// component

function _DatePicker<T extends DateValue>(props: DatePickerProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  const globalProps = useGlobalProps("DatePicker", props);

  const { size, radius, color, visibleMonthCount } = globalProps;

  const [width, datePickerRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaDatePicker ref={datePickerRef} {...globalProps}>
      {(renderProps) => (
        <>
          <FieldInput
            endButton={
              <Button>
                <CalendarIcon />
              </Button>
            }
            {...renderProps}
            {...globalProps}
          >
            <DateInput ref={ref}>
              {(segment) => <DateSegment segment={segment} className={({ isPlaceholder }) => useFieldSegmentStyles()({ isPlaceholder })} />}
            </DateInput>
          </FieldInput>

          <Popover hideArrow placement="bottom" {...globalProps} className="overflow-auto p-0" style={{ maxWidth: width }}>
            <Calendar
              aria-label={globalProps["aria-label"] ?? (typeof globalProps.label === "string" ? globalProps.label : undefined)}
              aria-describedby={
                globalProps["aria-describedby"] ?? (typeof globalProps.description === "string" ? globalProps.description : undefined)
              }
              asCard={false}
              color={color}
              size={size}
              radius={radius}
              visibleMonthCount={visibleMonthCount}
            />
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}

const DatePicker = (forwardRef as ForwardRefType)(_DatePicker);

// exports

export { DatePicker };
