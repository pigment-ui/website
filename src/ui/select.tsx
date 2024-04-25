"use client";

import { ForwardedRef, forwardRef, ReactNode } from "react";
import {
  Button,
  ListBoxProps,
  Popover,
  PopoverProps,
  Select as AriaSelect,
  SelectProps as AriaSelectProps,
  SelectValue,
  SelectValueRenderProps,
} from "react-aria-components";

import { ChevronDownIcon } from "lucide-react";

import { ForwardRefType } from "./types";

import { cardStyles } from "./card";
import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";

// props

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children">,
    Omit<PopoverProps, keyof AriaSelectProps<T>>,
    Pick<ListBoxProps<T>, "items" | "children">,
    ListBoxSlotsType,
    FieldBaseProps,
    FieldInputBaseProps {
  renderValue?: (selectValue: Omit<SelectValueRenderProps<T>, "isPlaceholder">) => ReactNode;
}

// component

function _Select<T extends object>(props: SelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const { renderValue, placeholder } = props;

  return (
    <AriaSelect {...props}>
      {(renderProps) => (
        <>
          <Field {...renderProps} {...props}>
            <FieldInput endContent={<ChevronDownIcon />} {...renderProps} {...props}>
              <Button ref={ref} className="flex items-center">
                <SelectValue className={({ isPlaceholder }) => (isPlaceholder ? "!text-default-500" : "")}>
                  {renderValue
                    ? ({ selectedItem, selectedText }) =>
                        selectedItem ? renderValue({ selectedItem: selectedItem as T, selectedText }) : placeholder ?? "Select"
                    : undefined}
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
export type { SelectProps };
