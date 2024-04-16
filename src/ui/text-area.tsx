"use client";

import { ForwardedRef, forwardRef } from "react";
import { TextArea as AriaTextArea, TextAreaProps, TextField, TextFieldProps } from "react-aria-components";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentTextAreaProps extends TextFieldProps, Omit<TextAreaProps, keyof TextFieldProps>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {
  isResizable?: boolean;
}

// component

function _TextArea(props: PigmentTextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
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
export type { PigmentTextAreaProps };
