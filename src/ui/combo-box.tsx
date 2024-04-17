"use client";

import { ForwardedRef, forwardRef } from "react";
import {
  Button,
  ComboBox as AriaComboBox,
  ComboBoxProps,
  Input,
  InputProps,
  ListBoxProps,
  Popover,
  PopoverProps,
  TextFieldProps,
} from "react-aria-components";

import { ChevronDownIcon } from "./icons";
import { ForwardRefType } from "./types";

import { cardStyles } from "./card";
import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";

// props

interface PigmentComboBoxProps<T extends object>
  extends Omit<ComboBoxProps<T>, "children">,
    Pick<ListBoxProps<T>, "items" | "children">,
    Omit<InputProps, keyof TextFieldProps | "color" | "size">,
    Omit<PopoverProps, keyof ComboBoxProps<T>>,
    ListBoxSlotsType,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps {}

// component

function _ComboBox<T extends object>(props: PigmentComboBoxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaComboBox {...props}>
      {(renderProps) => (
        <>
          <Field {...renderProps} {...props}>
            <FieldInput
              endButton={
                <Button>
                  <ChevronDownIcon />
                </Button>
              }
              {...renderProps}
              {...props}
            >
              <Input ref={ref} />
            </FieldInput>
          </Field>

          <Popover maxHeight={300} {...props} className={cardStyles().base({ className: "w-[var(--trigger-width)] overflow-auto p-2" })} style={{}}>
            <ListBox {...filterInlineListBoxProps(props)} />
          </Popover>
        </>
      )}
    </AriaComboBox>
  );
}

const ComboBox = (forwardRef as ForwardRefType)(_ComboBox);

const ComboBoxItem = ListBoxItem;

const ComboBoxSection = ListBoxSection;

// exports

export { ComboBox, ComboBoxItem, ComboBoxSection };
export type { PigmentComboBoxProps };
