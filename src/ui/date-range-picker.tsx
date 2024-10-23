"use client";

import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import {
  Button,
  DateInput,
  DateRangePicker as AriaDateRangePicker,
  DateRangePickerProps as AriaDateRangePickerProps,
  DateSegment,
  DateValue,
  InputProps,
} from "react-aria-components";

import { CalendarIcon } from "lucide-react";

import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";
import { useObserveElementWidth } from "./utils";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import { Popover } from "./popover";
import { RangeCalendar } from "./range-calendar";

// props

interface DateRangePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T>,
    Omit<InputProps, keyof AriaDateRangePickerProps<T> | "color" | "size">,
    Omit<ComponentPropsWithoutRef<typeof Popover>, keyof AriaDateRangePickerProps<T>>,
    FieldBaseProps,
    FieldInputBaseProps {
  visibleMonthCount?: number;
}

// component

function _DateRangePicker<T extends DateValue>(props: DateRangePickerProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  const { size, radius, visibleMonthCount } = props;

  const [width, datePickerRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaDateRangePicker ref={datePickerRef} {...props}>
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
              <div className="gap-2">
                <DateInput ref={ref} slot="start" className="flex items-center">
                  {(segment) => (
                    <DateSegment
                      segment={segment}
                      className={({ isFocused, isPlaceholder }) => segmentStyles({ isFocused, isPlaceholder, size, radius })}
                    />
                  )}
                </DateInput>

                <span aria-hidden="true">–</span>

                <DateInput slot="end" className="flex items-center">
                  {(segment) => (
                    <DateSegment
                      segment={segment}
                      className={({ isFocused, isPlaceholder }) => segmentStyles({ isFocused, isPlaceholder, size, radius })}
                    />
                  )}
                </DateInput>
              </div>
            </FieldInput>
          </Field>

          <Popover hideArrow placement="bottom" {...props} className="overflow-auto p-0" style={{ maxWidth: width }}>
            <RangeCalendar aria-label={props["aria-label"] || props.label} asCard={false} visibleMonthCount={visibleMonthCount} />
          </Popover>
        </>
      )}
    </AriaDateRangePicker>
  );
}

const DateRangePicker = (forwardRef as ForwardRefType)(_DateRangePicker);

// exports

export { DateRangePicker };
