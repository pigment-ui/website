"use client";

import { CheckboxGroupSlotsProvider, checkboxGroupStyles, checkboxStyles, CheckboxStylesReturnType, useCheckboxGroupSlots } from "./checkbox";
import { Field, FieldBaseProps } from "./field";
import { useGlobalProps } from "./provider";
import { ColorProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
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

// styles

const radioGroupStyles = checkboxGroupStyles;

const radioStyles = checkboxStyles;

// props

interface RadioGroupProps extends AriaRadioGroupProps, VariantProps, ColorProps, FieldBaseProps {
  orientation?: Orientation;
  itemClassNames?: RadioProps["classNames"];
  itemStyles?: RadioProps["styles"];
}

interface RadioProps extends AriaRadioProps, SizeProps, StyleSlotsToStyleProps<CheckboxStylesReturnType> {}

// component

function _RadioGroup(props: RadioGroupProps, ref: ForwardedRef<HTMLInputElement>) {
  const globalProps = useGlobalProps("RadioGroup", props, { variant: "solid", color: "default", size: "md", orientation: "vertical" });

  const { variant, color, size, orientation, itemClassNames, itemStyles } = globalProps;

  return (
    <CheckboxGroupSlotsProvider value={{ variant, color, size, radius: "full", itemClassNames, itemStyles }}>
      <AriaRadioGroup ref={ref} {...globalProps}>
        {composeRenderProps(globalProps.children, (children, renderProps) => (
          <Field {...renderProps} {...globalProps}>
            <div className={radioGroupStyles({ size, orientation })}>{children}</div>
          </Field>
        ))}
      </AriaRadioGroup>
    </CheckboxGroupSlotsProvider>
  );
}

const RadioGroup = forwardRef(_RadioGroup);

function _Radio(props: RadioProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { variant = "solid", color = "default", size = "md", classNames, itemClassNames, styles, itemStyles } = useCheckboxGroupSlots(props);

  const styleSlots = radioStyles({ size, radius: "full" });

  return (
    <AriaRadio
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, { isInvalid, isDisabled }) =>
        styleSlots.wrapper({ isInvalid, isDisabled, className: twMerge(itemClassNames?.wrapper, classNames?.wrapper, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.wrapper, styles?.wrapper, style))}
    >
      {composeRenderProps(props.children, (children, { isSelected, isInvalid, isHovered, isPressed, isFocusVisible }) => (
        <>
          <div
            className={styleSlots.base({
              variant: isSelected ? variant : "outlined",
              color: isInvalid ? "error" : color,
              isHovered,
              isPressed,
              isFocusVisible,
              className: twMerge(itemClassNames?.base, classNames?.base),
            })}
            style={mergeProps(itemStyles?.base, styles?.base)}
          >
            <svg
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden={!isSelected}
              fill="currentColor"
              className={twMerge(!isSelected ? "scale-0" : "scale-75")}
            >
              <circle cx="50" cy="50" r="50" />
            </svg>
          </div>
          <div>{children}</div>
        </>
      ))}
    </AriaRadio>
  );
}

const Radio = forwardRef(_Radio);

// exports

export { RadioGroup, Radio };
