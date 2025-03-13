"use client";

import { FieldInput, FieldInputBaseProps } from "./field";
import { useGlobalProps } from "./provider";
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

interface NumberFieldProps extends AriaNumberFieldProps, Omit<InputProps, keyof TextFieldProps | "size" | "step" | "color">, FieldInputBaseProps {
  hideControls?: boolean;
}

// component

function _NumberField(props: NumberFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  const globalProps = useGlobalProps("NumberField", props, {});

  const { hideControls } = globalProps;

  return (
    <AriaNumberField {...globalProps}>
      {(renderProps) => (
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
          {...globalProps}
        >
          <Input ref={ref} />
        </FieldInput>
      )}
    </AriaNumberField>
  );
}

const NumberField = forwardRef(_NumberField);

// exports

export { NumberField };
