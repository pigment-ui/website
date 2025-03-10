"use client";

import { Calendar } from "./calendar";
import { FieldInput, FieldInputBaseProps } from "./field";
import { Popover } from "./popover";
import { segmentStyles } from "./styles";
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
  const { size, radius = size, color, variant, visibleMonthCount } = props;

  const [width, datePickerRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaDatePicker ref={datePickerRef} {...props}>
      {(renderProps) => (
        <>
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
                  className={({ isFocused, isPlaceholder }) =>
                    segmentStyles({ isFocused, isPlaceholder, color: renderProps.isInvalid ? "error" : color, variant, size, radius })
                  }
                />
              )}
            </DateInput>
          </FieldInput>

          <Popover hideArrow placement="bottom" {...props} className="overflow-auto p-0" style={{ maxWidth: width }}>
            <Calendar
              aria-label={props["aria-label"] ?? (typeof props.label === "string" ? props.label : undefined)}
              aria-describedby={props["aria-describedby"] ?? (typeof props.description === "string" ? props.description : undefined)}
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
