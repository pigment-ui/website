"use client";

import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import {
  Button,
  DateInput,
  DatePicker as AriaDatePicker,
  DatePickerProps as AriaDatePickerProps,
  DateSegment,
  DateValue,
  InputProps,
} from "react-aria-components";

import { CalendarIcon } from "lucide-react";

import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";
import { useObserveElementWidth } from "./utils";

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

  const [width, datePickerRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaDatePicker ref={datePickerRef} {...props}>
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

          <Popover hideArrow placement="bottom" {...props} className="overflow-auto p-0" style={{ maxWidth: width }}>
            <Calendar aria-label={props["aria-label"] || props.label} asCard={false} visibleMonthCount={visibleMonthCount} />
          </Popover>
        </>
      )}
    </AriaDatePicker>
  );
}

const DatePicker = (forwardRef as ForwardRefType)(_DatePicker);

// exports

export { DatePicker };
