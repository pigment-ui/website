"use client";

import { DropletIcon } from "lucide-react";
import { ForwardedRef, forwardRef } from "react";
import { ColorField as AriaColorField, ColorFieldProps as AriaColorFieldProps, Input, InputProps } from "react-aria-components";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";

// props

interface ColorFieldProps extends AriaColorFieldProps, Omit<InputProps, keyof AriaColorFieldProps | "size">, FieldBaseProps, FieldInputBaseProps {}

// component

function _ColorField(props: ColorFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaColorField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput
            startContent={<DropletIcon style={{ color: renderProps.state.inputValue, fill: "currentColor" }} />}
            {...renderProps}
            {...props}
          >
            <Input ref={ref} />
          </FieldInput>
        </Field>
      )}
    </AriaColorField>
  );
}

const ColorField = forwardRef(_ColorField);

// exports

export { ColorField };
