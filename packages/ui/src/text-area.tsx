"use client";

import React, { ForwardedRef, forwardRef } from "react";
import { TextArea as AriaTextArea, TextAreaProps as AriaTextAreaProps, TextField, TextFieldProps } from "react-aria-components";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";

// props

interface TextAreaProps extends TextFieldProps, Omit<AriaTextAreaProps, keyof TextFieldProps>, FieldBaseProps, FieldInputBaseProps {
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
