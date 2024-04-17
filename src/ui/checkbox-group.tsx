"use client";

import { ForwardedRef, forwardRef } from "react";
import { Orientation } from "react-aria";
import { CheckboxGroup as AriaCheckboxGroup, CheckboxGroupProps, composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { RadiusProps } from "./types";
import { createSlots } from "./utils";

import { PigmentCheckboxProps } from "./checkbox";
import { Field, PigmentFieldBaseProps } from "./field";

// styles

const checkboxGroupStyles = tv({
  base: "flex",
  variants: {
    size: {
      sm: "py-1.5 gap-1.5",
      md: "py-2 gap-2",
      lg: "py-2.5 gap-2.5",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
});

// props

interface PigmentCheckboxGroupProps extends CheckboxGroupProps, PigmentFieldBaseProps, RadiusProps {
  orientation?: Orientation;
  itemClassNames?: PigmentCheckboxProps["classNames"];
  itemStyles?: PigmentCheckboxProps["styles"];
}

// slots

interface CheckboxGroupSlotsType extends Pick<PigmentCheckboxGroupProps, "size" | "radius" | "itemClassNames" | "itemStyles"> {}

const [CheckboxGroupSlotsProvider, useCheckboxGroupSlots] = createSlots<CheckboxGroupSlotsType>();

// component

function _CheckboxGroup(props: PigmentCheckboxGroupProps, ref: ForwardedRef<HTMLInputElement>) {
  const { size = "md", radius, orientation = "vertical", itemClassNames, itemStyles } = props;

  return (
    <CheckboxGroupSlotsProvider value={{ size, radius, itemClassNames, itemStyles }}>
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
export type { PigmentCheckboxGroupProps };
