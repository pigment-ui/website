"use client";

import { ForwardedRef, forwardRef } from "react";
import {
  Button,
  ComboBox as AriaComboBox,
  ComboBoxProps as AriaComboBoxProps,
  Input,
  InputProps,
  ListBoxProps,
  Popover,
  PopoverProps,
} from "react-aria-components";

import { ChevronDownIcon } from "lucide-react";

import { ForwardRefType } from "./types";

import { cardStyles } from "./card";
import { Field, FieldInput, FieldBaseProps, FieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";

// props

interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children">,
    Omit<InputProps, keyof AriaComboBoxProps<T> | "color" | "size">,
    Omit<PopoverProps, keyof AriaComboBoxProps<T>>,
    Pick<ListBoxProps<T>, "items" | "children">,
    ListBoxSlotsType,
    FieldBaseProps,
    FieldInputBaseProps {}

// component

function _ComboBox<T extends object>(props: ComboBoxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaComboBox menuTrigger="focus" {...props}>
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
export type { ComboBoxProps };
