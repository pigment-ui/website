"use client";

import { CalendarIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { DateField as AriaDateField, DateFieldProps as AriaDateFieldProps, DateInput, DateSegment, DateValue } from "react-aria-components";

import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";

// props

interface DateFieldProps<T extends DateValue> extends AriaDateFieldProps<T>, FieldBaseProps, FieldInputBaseProps {}

// component

function _DateField<T extends DateValue>(props: DateFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size, radius } = props;

  return (
    <AriaDateField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput startContent={<CalendarIcon />} {...renderProps} {...props}>
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
      )}
    </AriaDateField>
  );
}

const DateField = (forwardRef as ForwardRefType)(_DateField);

// exports

export { DateField };
