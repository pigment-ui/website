"use client";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import React, { ForwardedRef, forwardRef } from "react";
import { Input, InputProps, TextField as AriaTextField, TextFieldProps as AriaTextFieldProps } from "react-aria-components";

// props

interface TextFieldProps
  extends AriaTextFieldProps,
    Omit<InputProps, keyof AriaTextFieldProps | "size" | "color">,
    FieldBaseProps,
    FieldInputBaseProps {}

// component

function _TextField(props: TextFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaTextField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput {...renderProps} {...props}>
            <Input ref={ref} />
          </FieldInput>
        </Field>
      )}
    </AriaTextField>
  );
}

const TextField = forwardRef(_TextField);

// exports

export { TextField };
