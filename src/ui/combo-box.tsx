"use client";

import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { Button, ComboBox as AriaComboBox, ComboBoxProps as AriaComboBoxProps, Input, InputProps } from "react-aria-components";

import { ChevronDownIcon } from "lucide-react";

import { ForwardRefType } from "./types";
import { useObserveElementWidth } from "./utils";
import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";
import { Popover } from "./popover";

// props

interface ComboBoxProps<T extends object>
  extends Omit<AriaComboBoxProps<T>, "children">,
    Omit<InputProps, keyof AriaComboBoxProps<T> | "color" | "size">,
    Omit<ComponentPropsWithoutRef<typeof Popover>, keyof AriaComboBoxProps<T>>,
    ListBoxSlotsType<T>,
    FieldBaseProps,
    FieldInputBaseProps {}

// component

function _ComboBox<T extends object>(props: ComboBoxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
  const [width, comboBoxRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaComboBox ref={comboBoxRef} menuTrigger="focus" {...props}>
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

          <Popover maxHeight={300} hideArrow {...props} className="overflow-auto p-0" style={{ width }}>
            <ListBox {...filterInlineListBoxProps(props)} className="p-2" />
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
