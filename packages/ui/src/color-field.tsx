"use client";

import { FieldInput, FieldInputBaseProps } from "./field";
import { DropletIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { ColorField as AriaColorField, ColorFieldProps as AriaColorFieldProps, Input, InputProps } from "react-aria-components";

// props

interface ColorFieldProps extends AriaColorFieldProps, Omit<InputProps, keyof AriaColorFieldProps | "size" | "color">, FieldInputBaseProps {}

// component

function _ColorField(props: ColorFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaColorField {...props}>
      {(renderProps) => (
        <FieldInput startContent={<DropletIcon style={{ color: renderProps.state.inputValue, fill: "currentColor" }} />} {...renderProps} {...props}>
          <Input ref={ref} />
        </FieldInput>
      )}
    </AriaColorField>
  );
}

const ColorField = forwardRef(_ColorField);

// exports

export { ColorField };
