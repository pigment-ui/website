"use client";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import React, { ForwardedRef, forwardRef } from "react";
import { TextArea as AriaTextArea, TextAreaProps as AriaTextAreaProps, TextField, TextFieldProps } from "react-aria-components";

// props

interface TextAreaProps extends TextFieldProps, Omit<AriaTextAreaProps, keyof TextFieldProps | "color">, FieldBaseProps, FieldInputBaseProps {
  isResizable?: boolean;
}

// component

function _TextArea(props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  const { rows = 5, isResizable = false } = props;

  return (
    <TextField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput {...renderProps} {...props} isTextArea>
            <AriaTextArea ref={ref} rows={rows} className={!isResizable ? "[resize:none;]" : undefined} />
          </FieldInput>
        </Field>
      )}
    </TextField>
  );
}

const TextArea = forwardRef(_TextArea);

// exports

export { TextArea };
