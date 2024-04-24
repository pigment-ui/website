"use client";

import { ForwardedRef, forwardRef } from "react";
import { DateField as AriaDateField, DateFieldProps, DateInput, DateSegment, DateValue } from "react-aria-components";

import { CalendarIcon } from "lucide-react";

import { ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { segmentStyles } from "./styles";

// props

interface PigmentDateFieldProps<T extends DateValue> extends DateFieldProps<T>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _DateField<T extends DateValue>(props: PigmentDateFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size, radius } = props;

  return (
    <AriaDateField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput startContent={<CalendarIcon />} {...renderProps} {...props}>
            <DateInput ref={ref}>
              {(segment) => <DateSegment segment={segment} className={({ isFocused }) => segmentStyles({ size, radius, isFocused })} />}
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
export type { PigmentDateFieldProps };
