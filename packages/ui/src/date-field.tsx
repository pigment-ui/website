"use client";

import { FieldInput, FieldInputBaseProps, useFieldSegmentStyles } from "./field";
import { useGlobalProps } from "./provider";
import { ForwardRefType } from "./types";
import { CalendarIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { DateField as AriaDateField, DateFieldProps as AriaDateFieldProps, DateInput, DateSegment, DateValue } from "react-aria-components";

// props

interface DateFieldProps<T extends DateValue> extends AriaDateFieldProps<T>, FieldInputBaseProps {}

// component

function _DateField<T extends DateValue>(props: DateFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("DateField", props, {});

  return (
    <AriaDateField {...globalProps}>
      {(renderProps) => (
        <FieldInput startContent={<CalendarIcon />} {...renderProps} {...globalProps}>
          <DateInput>
            {(segment) => (
              <DateSegment
                ref={segment.isPlaceholder ? ref : undefined}
                segment={segment}
                className={({ isPlaceholder }) => useFieldSegmentStyles()({ isPlaceholder })}
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
