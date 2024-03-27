"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, ComboBox as AriaComboBox, ComboBoxProps, Input, InputProps, Popover } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox } from "#/ui/list-box";

// props

interface PigmentComboBoxProps<T extends object>
  extends FilterProps<ComboBoxProps<T> & Omit<InputProps, "size">>,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps {}

// component

function _ComboBox<T extends object>(props: PigmentComboBoxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaComboBox {...props}>
      <Field {...props}>
        <FieldInput
          endButton={
            <Button>
              <ChevronDownIcon />
            </Button>
          }
          {...props}
        >
          <Input ref={ref} />
        </FieldInput>
      </Field>

      <Popover style={{ width: "var(--trigger-width)" }}>
        <ListBox>{props.children}</ListBox>
      </Popover>
    </AriaComboBox>
  );
}

const ComboBox = (forwardRef as ForwardRefType)(_ComboBox);

// exports

export { ComboBox };
export type { PigmentComboBoxProps };
