"use client";

import { ChevronDownIcon } from "lucide-react";
import { ForwardedRef, forwardRef } from "react";
import { Button, Popover, PopoverProps, Select as AriaSelect, SelectProps, SelectValue } from "react-aria-components";

import { ForwardRefType } from "./types";

import { cardStyles } from "./card";
import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";

// props

interface PigmentSelectProps<T extends object>
  extends SelectProps<T>,
    Omit<PopoverProps, keyof SelectProps<T>>,
    ListBoxSlotsType,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps {}

// component

function _Select<T extends object>(props: PigmentSelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  return (
    <AriaSelect {...props}>
      {(renderProps) => (
        <>
          <Field {...renderProps} {...props}>
            <FieldInput endContent={<ChevronDownIcon />} {...renderProps} {...props}>
              <Button ref={ref} className="flex items-center">
                <SelectValue />
              </Button>
            </FieldInput>
          </Field>

          <Popover maxHeight={300} {...props} className={cardStyles().base({ className: "w-[var(--trigger-width)] p-2" })} style={{}}>
            <ListBox {...filterInlineListBoxProps(props)} />
          </Popover>
        </>
      )}
    </AriaSelect>
  );
}

const Select = (forwardRef as ForwardRefType)(_Select);

const SelectItem = ListBoxItem;

const SelectSection = ListBoxSection;

// exports

export { Select, SelectItem, SelectSection };
export type { PigmentSelectProps };
