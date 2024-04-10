"use client";

import { MinusIcon, PlusIcon } from "lucide-react";
import { ForwardedRef, forwardRef } from "react";
import { Button, Input, NumberField as AriaNumberField, NumberFieldProps } from "react-aria-components";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentNumberFieldProps extends NumberFieldProps, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _NumberField(props: PigmentNumberFieldProps, ref: ForwardedRef<HTMLInputElement>) {
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
export type { PigmentNumberFieldProps };
