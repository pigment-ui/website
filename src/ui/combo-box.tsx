"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, ComboBox as AriaComboBox, ComboBoxProps, Input } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox, ListBoxItem, ListBoxSection, PigmentListBoxItemProps, PigmentListBoxProps, PigmentListBoxSectionProps } from "./list-box";
import { PigmentPopoverProps, Popover } from "./popover";

// props

interface PigmentComboBoxProps<T extends object>
  extends FilterProps<ComboBoxProps<T>>,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps,
    Pick<PigmentPopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip" | "maxHeight">,
    Pick<PigmentListBoxProps<T>, "color" | "itemClassNames" | "sectionClassNames" | "itemStyles" | "sectionStyles"> {}

// component

function _ComboBox<T extends object>(props: PigmentComboBoxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
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
    <AriaComboBox {...props}>
      <Field {...props} className="" style={{}}>
        <FieldInput
          {...props}
          endButton={
            <Button>
              <ChevronDownIcon />
            </Button>
          }
        >
          <Input ref={ref} />
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
    </AriaComboBox>
  );
}

const ComboBox = (forwardRef as ForwardRefType)(_ComboBox);

function _ComboBoxItem(props: PigmentListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  return <ListBoxItem ref={ref} {...props} />;
}

const ComboBoxItem = forwardRef(_ComboBoxItem);

function _ComboBoxSection<T extends object>(props: PigmentListBoxSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  return <ListBoxSection ref={ref} {...props} />;
}

const ComboBoxSection = (forwardRef as ForwardRefType)(_ComboBoxSection);

// exports

export { ComboBox, ComboBoxItem, ComboBoxSection };
export type { PigmentComboBoxProps };
