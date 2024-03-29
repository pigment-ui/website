"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, InputProps, Popover, PopoverProps, Select as AriaSelect, SelectProps, SelectValue } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Card } from "./card";
import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox, ListBoxItem, ListBoxSection, PigmentListBoxItemProps, PigmentListBoxProps, PigmentListBoxSectionProps } from "./list-box";

// props

interface PigmentSelectProps<T extends object>
  extends FilterProps<SelectProps<T> & Omit<InputProps, "size" | "color">>,
    Pick<PopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip" | "maxHeight">,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps,
    Pick<PigmentListBoxProps<T>, "color" | "itemClassNames" | "sectionClassNames" | "itemStyles" | "sectionStyles"> {}

// component

function _Select<T extends object>(props: PigmentSelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    color,
    placement,
    offset,
    crossOffset,
    shouldFlip,
    maxHeight = 300,
    children,
    itemClassNames,
    sectionClassNames,
    itemStyles,
    sectionStyles,
  } = props;
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

      <Card asChild className="w-[var(--trigger-width)] overflow-auto p-2">
        <Popover placement={placement} offset={offset} crossOffset={crossOffset} shouldFlip={shouldFlip} maxHeight={maxHeight}>
          <ListBox
            isCard={false}
            color={color}
            itemClassNames={itemClassNames}
            sectionClassNames={sectionClassNames}
            itemStyles={itemStyles}
            sectionStyles={sectionStyles}
          >
            {children}
          </ListBox>
        </Popover>
      </Card>
    </AriaSelect>
  );
}

const Select = (forwardRef as ForwardRefType)(_Select);

function _SelectItem(props: PigmentListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  return <ListBoxItem ref={ref} {...props} />;
}

const SelectItem = forwardRef(_SelectItem);

function _SelectSection<T extends object>(props: PigmentListBoxSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  return <ListBoxSection ref={ref} {...props} />;
}

const SelectSection = (forwardRef as ForwardRefType)(_SelectSection);

// exports

export { Select, SelectItem, SelectSection };
export type { PigmentSelectProps };
