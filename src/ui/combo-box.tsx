"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, ComboBox as AriaComboBox, ComboBoxProps, Input, InputProps, Popover, PopoverProps } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox, ListBoxItem, PigmentListBoxItemProps, PigmentListBoxProps } from "./list-box";

// props

interface PigmentComboBoxProps<T extends object>
  extends FilterProps<ComboBoxProps<T> & Omit<InputProps, "size" | "color">>,
    Pick<PopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip">,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps,
    Pick<PigmentListBoxProps<T>, "color" | "itemClassNames" | "itemStyles"> {}

// component

function _ComboBox<T extends object>(props: PigmentComboBoxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaComboBox {...props}>
      <Field {...props} className="" style={{}}>
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
    </AriaComboBox>
  );
}

const ComboBox = (forwardRef as ForwardRefType)(_ComboBox);

function _ComboBoxItem(props: PigmentListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  return <ListBoxItem ref={ref} {...props} />;
}

const ComboBoxItem = forwardRef(_ComboBoxItem);

// exports

export { ComboBox, ComboBoxItem };
export type { PigmentComboBoxProps };
