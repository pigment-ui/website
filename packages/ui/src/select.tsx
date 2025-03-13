"use client";

import { FieldInput, FieldInputBaseProps } from "./field";
import { filterInlineListBoxProps, ListBox, ListBoxItem, ListBoxSection, ListBoxSlotsType } from "./list-box";
import { Popover } from "./popover";
import { useGlobalProps } from "./provider";
import { ForwardRefType } from "./types";
import { useObserveElementWidth } from "./utils";
import { ChevronDownIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { Button, Select as AriaSelect, SelectProps as AriaSelectProps, SelectValue, SelectValueRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";

// props

interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T>, "children">,
    Omit<ComponentPropsWithoutRef<typeof Popover>, keyof AriaSelectProps<T>>,
    ListBoxSlotsType<T>,
    FieldInputBaseProps {
  renderValue?: (selectValue: Omit<SelectValueRenderProps<T>, "isPlaceholder">) => ReactNode;
}

// component

function _Select<T extends object>(props: SelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const globalProps = useGlobalProps("Select", props, {});

  const { renderValue, placeholder } = globalProps;

  const [width, selectRef] = useObserveElementWidth<HTMLDivElement>();

  return (
    <AriaSelect ref={selectRef} placeholder="Select" {...globalProps}>
      {(renderProps) => (
        <>
          <FieldInput
            isFocusWithin={renderProps.isOpen}
            endContent={<ChevronDownIcon />}
            {...renderProps}
            {...globalProps}
            fieldInputClassNames={{ ...globalProps.fieldInputClassNames, base: twMerge("cursor-pointer", globalProps.fieldInputClassNames?.base) }}
          >
            <Button ref={ref} className="flex items-center">
              <SelectValue className={({ isPlaceholder }) => (isPlaceholder ? "opacity-50" : "")}>
                {renderValue
                  ? ({ selectedItem, selectedText }) => (selectedItem ? renderValue({ selectedItem: selectedItem as T, selectedText }) : placeholder)
                  : undefined}
              </SelectValue>
            </Button>
          </FieldInput>

          <Popover maxHeight={300} hideArrow triggerRef={selectRef} {...globalProps} className="overflow-auto p-0" style={{ width }}>
            <ListBox {...filterInlineListBoxProps(mergeProps(globalProps, renderProps))} className="p-2" />
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
