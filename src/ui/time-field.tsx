"use client";

import { ForwardedRef, forwardRef } from "react";
import { DateInput, DateSegment, TimeField as AriaTimeField, TimeFieldProps, TimeValue } from "react-aria-components";

import { ClockIcon } from "lucide-react";

import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentTimeFieldProps<T extends TimeValue> extends TimeFieldProps<T>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _TimeField<T extends TimeValue>(props: PigmentTimeFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size, radius } = props;

  return (
    <AriaTimeField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput startContent={<ClockIcon />} {...renderProps} {...props}>
            <DateInput ref={ref}>
              {(segment) => <DateSegment segment={segment} className={({ isFocused }) => segmentStyles({ size, radius, isFocused })} />}
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
export type { PigmentTimeFieldProps };
