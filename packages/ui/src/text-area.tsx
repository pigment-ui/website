"use client";

import { FieldInput, FieldInputBaseProps } from "./field";
import React, { ForwardedRef, forwardRef } from "react";
import { TextArea as AriaTextArea, TextAreaProps as AriaTextAreaProps, TextField, TextFieldProps } from "react-aria-components";

// props

interface TextAreaProps extends TextFieldProps, Omit<AriaTextAreaProps, keyof TextFieldProps | "color">, FieldInputBaseProps {
  isResizable?: boolean;
}

// component

function _TextArea(props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  const { rows = 5, isResizable = false } = props;

  return (
    <TextField {...props}>
      {(renderProps) => (
        <FieldInput {...renderProps} {...props} isTextArea>
          <AriaTextArea ref={ref} rows={rows} className={!isResizable ? "[resize:none;]" : undefined} />
        </FieldInput>
      )}
    </TextField>
  );
}

const TextArea = forwardRef(_TextArea);

// exports

export { TextArea };
