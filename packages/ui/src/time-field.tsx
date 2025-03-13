"use client";

import { FieldInput, FieldInputBaseProps, useFieldSegmentStyles } from "./field";
import { useGlobalProps } from "./provider";
import { ForwardRefType } from "./types";
import { ClockIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { DateInput, DateSegment, TimeField as AriaTimeField, TimeFieldProps as AriaTimeFieldProps, TimeValue } from "react-aria-components";

// props

interface TimeFieldProps<T extends TimeValue> extends AriaTimeFieldProps<T>, FieldInputBaseProps {}

// component

function _TimeField<T extends TimeValue>(props: TimeFieldProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("TimeField", props, {});

  return (
    <AriaTimeField {...globalProps}>
      {(renderProps) => (
        <FieldInput startContent={<ClockIcon />} {...renderProps} {...globalProps}>
          <DateInput ref={ref}>
            {(segment) => <DateSegment segment={segment} className={({ isPlaceholder }) => useFieldSegmentStyles()({ isPlaceholder })} />}
          </DateInput>
        </FieldInput>
      )}
    </AriaTimeField>
  );
}

const TimeField = (forwardRef as ForwardRefType)(_TimeField);

// exports

export { TimeField };
