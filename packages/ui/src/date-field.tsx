"use client";

import { FieldInput, FieldInputBaseProps } from "./field";
import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";
import { CalendarIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { DateField as AriaDateField, DateFieldProps as AriaDateFieldProps, DateInput, DateSegment, DateValue } from "react-aria-components";

// props

interface DateFieldProps<T extends DateValue> extends AriaDateFieldProps<T>, FieldInputBaseProps {}

// component

function _DateField<T extends DateValue>(props: DateFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size, radius = size, color, variant } = props;

  return (
    <AriaDateField {...props}>
      {(renderProps) => (
        <FieldInput startContent={<CalendarIcon />} {...renderProps} {...props}>
          <DateInput>
            {(segment) => (
              <DateSegment
                ref={segment.isPlaceholder ? ref : undefined}
                segment={segment}
                className={({ isFocused, isPlaceholder }) =>
                  segmentStyles({ isFocused, isPlaceholder, color: renderProps.isInvalid ? "error" : color, variant, size, radius })
                }
              />
            )}
          </DateInput>
        </FieldInput>
      )}
    </AriaDateField>
  );
}

const DateField = (forwardRef as ForwardRefType)(_DateField);

// exports

export { DateField };
