"use client";

import { ForwardedRef, forwardRef } from "react";
import { DateInput, DateSegment, TimeField as AriaTimeField, TimeFieldProps as AriaTimeFieldProps, TimeValue } from "react-aria-components";

import { ClockIcon } from "lucide-react";

import { segmentStyles } from "./styles";
import { ForwardRefType } from "./types";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";

// props

interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T>, FieldBaseProps, FieldInputBaseProps {}

// component

function _TimeField<T extends TimeValue>(props: TimeFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size, radius } = props;

  return (
    <AriaTimeField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput startContent={<ClockIcon />} {...renderProps} {...props}>
            <DateInput ref={ref}>{(segment) => <DateSegment segment={segment} className={segmentStyles({ size, radius })} />}</DateInput>
          </FieldInput>
        </Field>
      )}
    </AriaTimeField>
  );
}

const TimeField = (forwardRef as ForwardRefType)(_TimeField);

// exports

export { TimeField };
