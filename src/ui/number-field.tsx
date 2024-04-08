"use client";

import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, Input, NumberField as AriaNumberField, NumberFieldProps } from "react-aria-components";

import { FilterProps } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentNumberFieldProps extends FilterProps<NumberFieldProps>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _NumberField(props: PigmentNumberFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaNumberField {...props}>
      <Field {...props}>
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
          {...props}
        >
          <Input ref={ref} />
        </FieldInput>
      </Field>
    </AriaNumberField>
  );
}

const NumberField = forwardRef(_NumberField);

// exports

export { NumberField };
export type { PigmentNumberFieldProps };
