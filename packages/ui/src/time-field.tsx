"use client";

import { FieldInput, FieldInputBaseProps, fieldSegmentStyles } from "./field";
import { ForwardRefType } from "./types";
import { ClockIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { DateInput, DateSegment, TimeField as AriaTimeField, TimeFieldProps as AriaTimeFieldProps, TimeValue } from "react-aria-components";

// props

interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T>, FieldInputBaseProps {}

// component

function _TimeField<T extends TimeValue>(props: TimeFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size, radius = size, color, variant } = props;

  return (
    <AriaTimeField {...props}>
      {(renderProps) => (
        <FieldInput startContent={<ClockIcon />} {...renderProps} {...props}>
          <DateInput ref={ref}>
            {(segment) => <DateSegment segment={segment} className={({ isPlaceholder }) => fieldSegmentStyles({ isPlaceholder })} />}
          </DateInput>
        </FieldInput>
      )}
    </AriaTimeField>
  );
}

const TimeField = (forwardRef as ForwardRefType)(_TimeField);

// exports

export { TimeField };
