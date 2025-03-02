"use client";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
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

// props

interface NumberFieldProps
  extends AriaNumberFieldProps,
    Omit<InputProps, keyof TextFieldProps | "size" | "step" | "color">,
    FieldBaseProps,
    FieldInputBaseProps {
  hideControls?: boolean;
}

// component

function _NumberField(props: NumberFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  const { hideControls = false } = props;

  return (
    <AriaNumberField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput
            startButton={
              !hideControls ? (
                <Button slot="decrement">
                  <MinusIcon />
                </Button>
              ) : undefined
            }
            endButton={
              !hideControls ? (
                <Button slot="increment">
                  <PlusIcon />
                </Button>
              ) : undefined
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
