"use client";

import { ChevronDownIcon } from "lucide-react";
import { ForwardedRef, forwardRef, ReactNode } from "react";
import {
  Button,
  ListBoxProps,
  Popover,
  PopoverProps,
  Select as AriaSelect,
  SelectProps,
  SelectValue,
  SelectValueRenderProps,
} from "react-aria-components";

import { ForwardRefType } from "./types";

import { cardStyles } from "./card";
import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";

// props

interface PigmentSelectProps<T extends object>
  extends Omit<SelectProps<T>, "children">,
    Pick<ListBoxProps<T>, "items" | "children">,
    Omit<PopoverProps, keyof SelectProps<T>>,
    ListBoxSlotsType,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps {
  renderValue?: (selectValue: Omit<SelectValueRenderProps<T>, "isPlaceholder">) => ReactNode;
}

// component

function _Select<T extends object>(props: PigmentSelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const { renderValue, placeholder } = props;

  return (
    <AriaSelect {...props}>
      {(renderProps) => (
        <>
          <Field {...renderProps} {...props}>
            <FieldInput endContent={<ChevronDownIcon />} {...renderProps} {...props}>
              <Button ref={ref} className="flex items-center">
                <SelectValue>
                  {({ selectedItem, selectedText }) =>
                    renderValue && selectedItem ? renderValue({ selectedItem: selectedItem as T, selectedText }) : placeholder ?? "Select"
                  }
                </SelectValue>
              </Button>
            </FieldInput>
          </Field>

          <Popover maxHeight={300} {...props} className={cardStyles().base({ className: "w-[var(--trigger-width)] overflow-auto p-2" })} style={{}}>
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
