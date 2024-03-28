"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, InputProps, Popover, PopoverProps, Select as AriaSelect, SelectProps, SelectValue } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox, ListBoxItem, PigmentListBoxItemProps, PigmentListBoxProps } from "./list-box";

// props

interface PigmentSelectProps<T extends object>
  extends FilterProps<SelectProps<T> & Omit<InputProps, "size" | "color">>,
    Pick<PopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip">,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps,
    Pick<PigmentListBoxProps<T>, "color" | "itemClassNames" | "itemStyles"> {}

// component

function _Select<T extends object>(props: PigmentSelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <AriaSelect {...props}>
      <Field {...props} className="" style={{}}>
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

      <Popover
        placement={props.placement}
        offset={props.offset}
        crossOffset={props.crossOffset}
        shouldFlip={props.shouldFlip}
        style={{ width: "var(--trigger-width)" }}
      >
        <ListBox color={props.color} itemClassNames={props.itemClassNames} itemStyles={props.itemStyles}>
          {props.children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

const Select = (forwardRef as ForwardRefType)(_Select);

function _SelectItem(props: PigmentListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  return <ListBoxItem ref={ref} {...props} />;
}

const SelectItem = forwardRef(_SelectItem);

// exports

export { Select, SelectItem };
export type { PigmentSelectProps };
