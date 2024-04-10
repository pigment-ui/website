"use client";

import { useObjectRef } from "@react-aria/utils";
import { AriaColorFieldProps, useColorField } from "@react-aria/color";
import { useColorFieldState } from "@react-stately/color";
import { ForwardedRef, forwardRef } from "react";
import { useField } from "react-aria";
import { FieldErrorContext, LabelContext, Provider, TextContext } from "react-aria-components";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ColorWheelIcon } from "@radix-ui/react-icons";

// props

interface PigmentColorFieldProps extends AriaColorFieldProps, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _ColorField(props: PigmentColorFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  const objRef = useObjectRef(ref);
  const state = useColorFieldState({ validationBehavior: "native", ...props });
  const { labelProps, inputProps, ...validation } = useColorField({ validationBehavior: "native", ...props }, state, objRef);
  const { descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...props });

  return (
    <Provider
      values={[
        [LabelContext, { ...labelProps }],
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, validation],
      ]}
    >
      <Field {...validation} {...props}>
        <FieldInput {...validation} {...props} startContent={<ColorWheelIcon style={{ color: state.inputValue }} />}>
          <input ref={objRef} {...inputProps} />
        </FieldInput>
      </Field>
    </Provider>
  );
}

const ColorField = forwardRef(_ColorField);

// exports

export { ColorField };
export type { PigmentColorFieldProps };
