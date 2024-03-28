"use client";

import { ForwardedRef, forwardRef } from "react";
import { Input, InputProps, TextField as AriaTextField, TextFieldProps } from "react-aria-components";

import { FilterProps } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentTextFieldProps extends FilterProps<TextFieldProps & Omit<InputProps, "size">>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _TextField(props: PigmentTextFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaTextField {...props}>
      <Field {...props} className="" style={{}}>
        <FieldInput {...props}>
          <Input ref={ref} />
        </FieldInput>
      </Field>
    </AriaTextField>
  );
}

const TextField = forwardRef(_TextField);

// exports

export { TextField };
export type { PigmentTextFieldProps };
