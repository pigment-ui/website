"use client";

import { AriaColorFieldProps, useColorField } from "@react-aria/color";
import { ForwardedRef, forwardRef } from "react";

import { FilterProps } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { useColorFieldState } from "@react-stately/color";
import { useField } from "react-aria";
import { useObjectRef } from "@react-aria/utils";

// props

interface PigmentColorFieldProps
  extends Omit<FilterProps<AriaColorFieldProps>, keyof PigmentFieldBaseProps>,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps {}

// component

function _ColorField(props: PigmentColorFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  const objRef = useObjectRef(ref);
  const state = useColorFieldState({ validationBehavior: "native", ...props });
  const { labelProps, inputProps, ...validation } = useColorField({ validationBehavior: "native", ...props }, state, objRef);
  const { descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...props });

  return (
    <Field {...validation} {...props} labelProps={labelProps} descriptionProps={descriptionProps} errorMessageProps={errorMessageProps}>
      <FieldInput {...validation} {...props}>
        <input ref={objRef} {...inputProps} />
      </FieldInput>
    </Field>
  );
}

const ColorField = forwardRef(_ColorField);

// exports

export { ColorField };
export type { PigmentColorFieldProps };
