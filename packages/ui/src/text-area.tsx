"use client";

import { FieldInput, FieldInputBaseProps } from "./field";
import { useGlobalProps } from "./provider";
import React, { ForwardedRef, forwardRef } from "react";
import { TextArea as AriaTextArea, TextAreaProps as AriaTextAreaProps, TextField, TextFieldProps } from "react-aria-components";

// props

interface TextAreaProps extends TextFieldProps, Omit<AriaTextAreaProps, keyof TextFieldProps | "color">, FieldInputBaseProps {
  isResizable?: boolean;
  rows?: number;
}

// component

function _TextArea(props: TextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  const globalProps = useGlobalProps("TextArea", props, { rows: 5 });

  const { rows, isResizable } = globalProps;

  return (
    <TextField {...globalProps}>
      {(renderProps) => (
        <FieldInput {...renderProps} {...globalProps} isAutoHeight>
          <AriaTextArea ref={ref} rows={rows} className={!isResizable ? "[resize:none;]" : undefined} />
        </FieldInput>
      )}
    </TextField>
  );
}

const TextArea = forwardRef(_TextArea);

// exports

export { TextArea };
