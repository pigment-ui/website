"use client";

import { FieldInput, FieldInputBaseProps, fieldSegmentStyles } from "./field";
import { Popover } from "./popover";
import { RangeCalendar } from "./range-calendar";
import { ForwardRefType } from "./types";
import { useObserveElementWidth } from "./utils";
import { CalendarIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import {
  Button,
  DateInput,
  DateRangePicker as AriaDateRangePicker,
  DateRangePickerProps as AriaDateRangePickerProps,
  DateSegment,
  DateValue,
  InputProps,
} from "react-aria-components";

// props

interface DateRangePickerProps<T extends DateValue>
  extends AriaDateRangePickerProps<T>,
    Omit<InputProps, keyof AriaDateRangePickerProps<T> | "color" | "size">,
    Omit<ComponentPropsWithoutRef<typeof Popover>, keyof AriaDateRangePickerProps<T>>,
    FieldInputBaseProps {
  visibleMonthCount?: number;
}

// component

function _DateRangePicker<T extends DateValue>(props: DateRangePickerProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  const { size, radius = size, color, variant, visibleMonthCount } = props;

  const [width, datePickerRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaDateRangePicker ref={datePickerRef} {...props}>
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
            <div className="gap-2">
              <DateInput ref={ref} slot="start" className="flex items-center">
                {(segment) => <DateSegment segment={segment} className={({ isPlaceholder }) => fieldSegmentStyles({ isPlaceholder })} />}
              </DateInput>

              <span aria-hidden="true">–</span>

              <DateInput slot="end" className="flex items-center">
                {(segment) => <DateSegment segment={segment} className={({ isPlaceholder }) => fieldSegmentStyles({ isPlaceholder })} />}
              </DateInput>
            </div>
          </FieldInput>

          <Popover hideArrow placement="bottom" {...props} className="overflow-auto p-0" style={{ maxWidth: width }}>
            <RangeCalendar
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
    </AriaDateRangePicker>
  );
}

const DateRangePicker = (forwardRef as ForwardRefType)(_DateRangePicker);

// exports

export { DateRangePicker };
