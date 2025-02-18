"use client";

import { checkboxGroupStyles } from "./checkbox-group";
import { Field, FieldBaseProps } from "./field";
import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { SizeProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";
import React, { ForwardedRef, forwardRef } from "react";
import { mergeProps, Orientation } from "react-aria";
import {
  composeRenderProps,
  Radio as AriaRadio,
  RadioGroup as AriaRadioGroup,
  RadioGroupProps as AriaRadioGroupProps,
  RadioProps as AriaRadioProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const radioGroupStyles = checkboxGroupStyles;

const radioStyles = tv({
  slots: {
    base: "flex cursor-pointer items-center",
    self: "grid place-items-center rounded-full border border-default-1000 border-opacity-50 duration-300",
  },
  variants: {
    size: {
      sm: { base: "gap-x-1.5 text-sm", self: "size-5 [&>svg]:size-4" },
      md: { base: "gap-x-2 text-base", self: "size-6 [&>svg]:size-5" },
      lg: { base: "gap-x-2.5 text-lg", self: "size-7 [&>svg]:size-6" },
    },
    isSelected: { true: { self: "border-8 border-opacity-100" } },
    isInvalid: { true: { base: "text-error-500", self: "border-error-500" } },
    isHovered: { true: { self: "border-opacity-100" } },
    isPressed: { true: { self: "scale-90" } },
    isFocusVisible: { true: { self: isFocusVisibleVariants.true } },
    isDisabled: isDisabledVariants,
  },
  compoundVariants: [{ isSelected: true, isHovered: true, className: { self: "border-opacity-90" } }],
});

type RadioStylesReturnType = ReturnType<typeof radioStyles>;

// props

interface RadioGroupProps extends AriaRadioGroupProps, FieldBaseProps {
  orientation?: Orientation;
  itemClassNames?: RadioProps["classNames"];
  itemStyles?: RadioProps["styles"];
}

interface RadioProps extends AriaRadioProps, SizeProps, StyleSlotsToStyleProps<RadioStylesReturnType> {}

// slots

interface RadioGroupSlotsType extends Pick<RadioGroupProps, "size" | "itemClassNames" | "itemStyles"> {}

const [RadioGroupSlotsProvider, useRadioGroupSlots] = createSlots<RadioGroupSlotsType>();

// component

function _RadioGroup(props: RadioGroupProps, ref: ForwardedRef<HTMLInputElement>) {
  const { size = "md", orientation = "vertical", itemClassNames, itemStyles } = props;

  return (
    <RadioGroupSlotsProvider value={{ size, itemClassNames, itemStyles }}>
      <AriaRadioGroup ref={ref} {...props}>
        {composeRenderProps(props.children, (children, renderProps) => (
          <Field {...renderProps} {...props}>
            <div className={radioGroupStyles({ size, orientation })}>{children}</div>
          </Field>
        ))}
      </AriaRadioGroup>
    </RadioGroupSlotsProvider>
  );
}

const RadioGroup = forwardRef(_RadioGroup);

function _Radio(props: RadioProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { size = "md", classNames, itemClassNames, styles, itemStyles } = useRadioGroupSlots(props);

  const styleSlots = radioStyles({ size });

  return (
    <AriaRadio
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, { isInvalid, isDisabled }) =>
        styleSlots.base({ isInvalid, isDisabled, className: twMerge(itemClassNames?.base, classNames?.base, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.base, styles?.base, style))}
    >
      {composeRenderProps(props.children, (children, { isSelected, isInvalid, isHovered, isPressed, isFocusVisible }) => (
        <>
          <div
            className={styleSlots.self({
              isSelected,
              isInvalid,
              isHovered,
              isPressed,
              isFocusVisible,
              className: twMerge(itemClassNames?.self, classNames?.self),
            })}
            style={mergeProps(itemStyles?.self, styles?.self)}
          />
          {children}
        </>
      ))}
    </AriaRadio>
  );
}

const Radio = forwardRef(_Radio);

// exports

export { RadioGroup, Radio };
