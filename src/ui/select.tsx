"use client";

import { ForwardedRef, forwardRef } from "react";
import { Button, InputProps, Popover, Select as AriaSelect, SelectProps, SelectValue } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox, PigmentListBoxProps } from "#/ui/list-box";
import { ChevronDownIcon } from "@radix-ui/react-icons";

// props

interface PigmentSelectProps<T extends object>
  extends FilterProps<SelectProps<T> & Omit<InputProps, "size" | "color">>,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps,
    Pick<PigmentListBoxProps<T>, "color" | "itemClassNames" | "itemStyles"> {}

// component

function _Select<T extends object>(props: PigmentSelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <AriaSelect {...props}>
      <Field {...props}>
        <FieldInput
          {...props}
          endButton={
            <div className="pointer-events-none">
              <ChevronDownIcon />
            </div>
          }
        >
          <Button ref={ref} className="flex items-center">
            <SelectValue />
          </Button>
        </FieldInput>
      </Field>

      <Popover style={{ width: "var(--trigger-width)" }}>
        <ListBox color={props.color} itemClassNames={props.itemClassNames} itemStyles={props.itemStyles}>
          {props.children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

const Select = (forwardRef as ForwardRefType)(_Select);

// exports

export { Select };
export type { PigmentSelectProps };
