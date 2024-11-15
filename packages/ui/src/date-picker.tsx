"use client";

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

import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";

import { Calendar } from "./calendar";
import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import { Popover } from "./popover";

// props

interface DatePickerProps<T extends DateValue>
  extends AriaDatePickerProps<T>,
    Omit<InputProps, keyof AriaDatePickerProps<T> | "color" | "size">,
    Omit<ComponentPropsWithoutRef<typeof Popover>, keyof AriaDatePickerProps<T>>,
    FieldBaseProps,
    FieldInputBaseProps {
  visibleMonthCount?: number;
}

// component

function _DatePicker<T extends DateValue>(props: DatePickerProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  const { size, radius, visibleMonthCount } = props;

  return (
    <AriaDatePicker {...props}>
      {(renderProps) => (
        <>
          <Field {...renderProps} {...props}>
            <FieldInput
              endButton={
                <Button>
                  <CalendarIcon />
                </Button>
              }
              {...renderProps}
              {...props}
            >
              <DateInput ref={ref}>
                {(segment) => (
                  <DateSegment
                    segment={segment}
                    className={({ isFocused, isPlaceholder }) => segmentStyles({ isFocused, isPlaceholder, size, radius })}
                  />
                )}
              </DateInput>
            </FieldInput>
          </Field>

          <Popover hideArrow placement="bottom" {...props} className="max-w-[calc(100vw-2rem)] overflow-auto p-0">
            <Calendar
              aria-label={props["aria-label"] ?? (typeof props.label === "string" ? props.label : undefined)}
              aria-describedby={props["aria-describedby"] ?? (typeof props.description === "string" ? props.description : undefined)}
              asCard={false}
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
