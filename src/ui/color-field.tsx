"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps, useField } from "react-aria";
import { useObjectRef } from "@react-aria/utils";
import { AriaColorFieldProps, useColorField } from "@react-aria/color";
import { useColorFieldState } from "@react-stately/color";
import { FieldErrorContext, LabelContext, Provider, TextContext } from "react-aria-components";

import { DropletIcon } from "lucide-react";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";

// props

interface ColorFieldProps extends AriaColorFieldProps, FieldBaseProps, FieldInputBaseProps {}

// component

function _ColorField(props: ColorFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  const objRef = useObjectRef(ref);
  const state = useColorFieldState({ validationBehavior: "native", ...props });
  const { labelProps, inputProps, ...validation } = useColorField({ validationBehavior: "native", ...props }, state, objRef);
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...validation, ...props });

  return (
    <Provider
      values={[
        [LabelContext, labelProps],
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, validation],
      ]}
    >
      <Field {...validation} {...props}>
        <FieldInput startContent={<DropletIcon style={{ color: state.inputValue, fill: "currentColor" }} />} {...validation} {...props}>
          <input ref={objRef} {...mergeProps(fieldProps, inputProps)} />
        </FieldInput>
      </Field>
    </Provider>
  );
}

const ColorField = forwardRef(_ColorField);

// exports

export { ColorField };
export type { ColorFieldProps };
