"use client";

import { ForwardedRef, forwardRef } from "react";
import { Orientation } from "react-aria";
import { CheckboxGroup as AriaCheckboxGroup, CheckboxGroupProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { FilterProps, RadiusProps } from "./types";
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

interface PigmentCheckboxGroupProps extends FilterProps<CheckboxGroupProps>, PigmentFieldBaseProps, RadiusProps {
  orientation?: Orientation;
  checkboxItemClassNames?: PigmentCheckboxProps["classNames"];
  checkboxItemStyles?: PigmentCheckboxProps["styles"];
}

// slots

interface CheckboxGroupSlotsType extends Pick<PigmentCheckboxGroupProps, "size" | "radius" | "checkboxItemClassNames" | "checkboxItemStyles"> {}

const [CheckboxGroupSlotsProvider, useCheckboxGroupSlots] = createSlots<CheckboxGroupSlotsType>();

// component

function _CheckboxGroup(props: PigmentCheckboxGroupProps, ref: ForwardedRef<HTMLInputElement>) {
  const { size = "md", radius, orientation = "vertical", children, checkboxItemClassNames, checkboxItemStyles } = props;

  return (
    <CheckboxGroupSlotsProvider value={{ size, radius, checkboxItemClassNames, checkboxItemStyles }}>
      <AriaCheckboxGroup ref={ref} {...props}>
        {(renderProps) => (
          <Field {...renderProps} {...props}>
            <div className={checkboxGroupStyles({ size, orientation })}>{children}</div>
          </Field>
        )}
      </AriaCheckboxGroup>
    </CheckboxGroupSlotsProvider>
  );
}

const CheckboxGroup = forwardRef(_CheckboxGroup);

// exports

export { CheckboxGroup, useCheckboxGroupSlots };
export type { PigmentCheckboxGroupProps };
