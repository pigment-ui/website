"use client";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";
import { ClockIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { DateInput, DateSegment, TimeField as AriaTimeField, TimeFieldProps as AriaTimeFieldProps, TimeValue } from "react-aria-components";

// props

interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T>, FieldBaseProps, FieldInputBaseProps {}

// component

function _TimeField<T extends TimeValue>(props: TimeFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size, radius = size } = props;

  return (
    <AriaTimeField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput startContent={<ClockIcon />} {...renderProps} {...props}>
            <DateInput ref={ref}>
              {(segment) => (
                <DateSegment
                  segment={segment}
                  className={({ isFocused, isPlaceholder }) => segmentStyles({ size, radius, isFocused, isPlaceholder })}
                />
              )}
            </DateInput>
          </FieldInput>
        </Field>
      )}
    </AriaTimeField>
  );
}

const TimeField = (forwardRef as ForwardRefType)(_TimeField);

// exports

export { TimeField };
