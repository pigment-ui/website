"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, Select as AriaSelect, SelectProps, SelectValue } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox, ListBoxItem, ListBoxSection, PigmentListBoxItemProps, PigmentListBoxProps, PigmentListBoxSectionProps } from "./list-box";
import { PigmentPopoverProps, Popover } from "./popover";

// props

interface PigmentSelectProps<T extends object>
  extends FilterProps<SelectProps<T>>,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps,
    Pick<PigmentPopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip" | "maxHeight">,
    Pick<PigmentListBoxProps<T>, "color" | "itemClassNames" | "sectionClassNames" | "itemStyles" | "sectionStyles"> {}

// component

function _Select<T extends object>(props: PigmentSelectProps<T>, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    color,
    size,
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
      <Field {...props}>
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

      <Popover
        isNonModal={false}
        placement={placement}
        offset={offset}
        crossOffset={crossOffset}
        shouldFlip={shouldFlip}
        maxHeight={maxHeight}
        className="w-[var(--trigger-width)] overflow-auto p-2"
      >
        <ListBox
          isCard={false}
          color={color}
          size={size}
          itemClassNames={itemClassNames}
          sectionClassNames={sectionClassNames}
          itemStyles={itemStyles}
          sectionStyles={sectionStyles}
        >
          {children}
        </ListBox>
      </Popover>
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
