"use client";

import { ForwardedRef, forwardRef } from "react";
import { TextArea as AriaTextArea, TextAreaProps, TextField, TextFieldProps } from "react-aria-components";

import { FilterProps } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentTextAreaProps
  extends FilterProps<TextFieldProps>,
    Omit<TextAreaProps, keyof TextFieldProps>,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps {}

// component

function _TextArea(props: PigmentTextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <TextField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput {...renderProps} {...props} isTextArea>
            <AriaTextArea ref={ref} rows={5} className="[resize:none;]" />
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
