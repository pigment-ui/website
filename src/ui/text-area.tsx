"use client";

import { ForwardedRef, forwardRef } from "react";
import { TextArea as AriaTextArea, TextField, TextFieldProps } from "react-aria-components";

import { FilterProps } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentTextAreaProps extends FilterProps<TextFieldProps>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {
  rows?: number;
}

// component

function _TextArea(props: PigmentTextAreaProps, ref: ForwardedRef<HTMLTextAreaElement>) {
  return (
    <TextField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput {...renderProps} {...props} isTextArea>
            <AriaTextArea ref={ref} rows={props.rows ?? 5} className="[resize:none;]" />
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
