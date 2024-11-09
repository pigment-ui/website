"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import {
  Button,
  Input,
  InputProps,
  NumberField as AriaNumberField,
  NumberFieldProps as AriaNumberFieldProps,
  TextFieldProps,
} from "react-aria-components";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";

// props

interface NumberFieldProps
  extends AriaNumberFieldProps,
    Omit<InputProps, keyof TextFieldProps | "size" | "step">,
    FieldBaseProps,
    FieldInputBaseProps {}

// component

function _NumberField(props: NumberFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaNumberField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput
            startButton={
              <Button slot="decrement">
                <MinusIcon />
              </Button>
            }
            endButton={
              <Button slot="increment">
                <PlusIcon />
              </Button>
            }
            {...renderProps}
            {...props}
          >
            <Input ref={ref} />
          </FieldInput>
        </Field>
      )}
    </AriaNumberField>
  );
}

const NumberField = forwardRef(_NumberField);

// exports

export { NumberField };
