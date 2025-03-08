"use client";

import { Checkbox } from "./checkbox";
import { Field, FieldBaseProps } from "./field";
import { ColorProps, RadiusProps, VariantProps } from "./types";
import { createSlots } from "./utils";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { Orientation } from "react-aria";
import { CheckboxGroup as AriaCheckboxGroup, CheckboxGroupProps as AriaCheckboxGroupProps, composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

// styles

const checkboxGroupStyles = tv({
  base: "flex",
  variants: {
    size: {
      sm: "gap-1.5 py-1.5",
      md: "gap-2 py-2",
      lg: "gap-2.5 py-2.5",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
});

// props

interface CheckboxGroupProps extends AriaCheckboxGroupProps, FieldBaseProps, VariantProps, ColorProps, RadiusProps {
  orientation?: Orientation;
  itemClassNames?: ComponentPropsWithoutRef<typeof Checkbox>["classNames"];
  itemStyles?: ComponentPropsWithoutRef<typeof Checkbox>["styles"];
}

// slots

interface CheckboxGroupSlotsType extends Pick<CheckboxGroupProps, "variant" | "color" | "size" | "radius" | "itemClassNames" | "itemStyles"> {}

const [CheckboxGroupSlotsProvider, useCheckboxGroupSlots] = createSlots<CheckboxGroupSlotsType>();

// component

function _CheckboxGroup(props: CheckboxGroupProps, ref: ForwardedRef<HTMLInputElement>) {
  const { variant = "soft", color = "default", size = "md", radius = size, orientation = "vertical", itemClassNames, itemStyles } = props;

  return (
    <CheckboxGroupSlotsProvider value={{ variant, color, size, radius, itemClassNames, itemStyles }}>
      <AriaCheckboxGroup ref={ref} {...props}>
        {composeRenderProps(props.children, (children, renderProps) => (
          <Field {...renderProps} {...props}>
            <div className={checkboxGroupStyles({ size, orientation })}>{children}</div>
          </Field>
        ))}
      </AriaCheckboxGroup>
    </CheckboxGroupSlotsProvider>
  );
}

const CheckboxGroup = forwardRef(_CheckboxGroup);

// exports

export { CheckboxGroup, checkboxGroupStyles, useCheckboxGroupSlots };
export type { CheckboxGroupSlotsType };
