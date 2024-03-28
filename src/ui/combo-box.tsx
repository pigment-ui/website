"use client";

import { ChevronDownIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, ComboBox as AriaComboBox, ComboBoxProps, Input, InputProps, Popover, PopoverProps } from "react-aria-components";

import { FilterProps, ForwardRefType } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";
import { ListBox, ListBoxItem, ListBoxSection, PigmentListBoxItemProps, PigmentListBoxProps, PigmentListBoxSectionProps } from "./list-box";

// props

interface PigmentComboBoxProps<T extends object>
  extends FilterProps<ComboBoxProps<T> & Omit<InputProps, "size" | "color">>,
    Pick<PopoverProps, "placement" | "offset" | "crossOffset" | "shouldFlip" | "maxHeight">,
    PigmentFieldBaseProps,
    PigmentFieldInputBaseProps,
    Pick<PigmentListBoxProps<T>, "color" | "itemClassNames" | "sectionClassNames" | "itemStyles" | "sectionStyles"> {}

// component

function _ComboBox<T extends object>(props: PigmentComboBoxProps<T>, ref: ForwardedRef<HTMLInputElement>) {
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
        isNonModal={false}
        placement={placement}
        offset={offset}
        crossOffset={crossOffset}
        shouldFlip={shouldFlip}
        style={{ width: "var(--trigger-width)" }}
      >
        <ListBox
          color={color}
          itemClassNames={itemClassNames}
          sectionClassNames={sectionClassNames}
          itemStyles={itemStyles}
          sectionStyles={sectionStyles}
          listBoxStyle={{ maxHeight, overflowY: "auto" }}
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
