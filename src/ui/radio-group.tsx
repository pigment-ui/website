"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps, Orientation } from "react-aria";
import { composeRenderProps, Radio as AriaRadio, RadioGroup as AriaRadioGroup, RadioGroupProps, RadioProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { SizeProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { checkboxGroupStyles } from "./checkbox-group";
import { Field, PigmentFieldBaseProps } from "#/ui/field";

// styles

const radioGroupStyles = checkboxGroupStyles;

const radioStyles = tv({
  slots: {
    base: "flex items-center",
    self: "grid place-items-center border border-default-1000 border-opacity-50 rounded-full",
  },
  variants: {
    size: {
      sm: { base: "text-sm gap-x-1.5", self: "size-5 [&>svg]:size-4" },
      md: { base: "text-base gap-x-2", self: "size-6 [&>svg]:size-5" },
      lg: { base: "text-lg gap-x-2.5", self: "size-7 [&>svg]:size-6" },
    },
    isSelected: { true: { self: "border-8 border-opacity-100" } },
    isInvalid: { true: { self: "border-error-500" } },
    isHovered: { true: { self: "border-opacity-100" } },
    isPressed: { true: { self: "scale-90" } },
    isFocusVisible: { true: { self: isFocusVisibleVariants.isFocusVisible.true } },
    ...isDisabledVariants,
  },
  compoundVariants: [{ isSelected: true, isHovered: true, className: { self: "border-opacity-90" } }],
});

type RadioStylesReturnType = ReturnType<typeof radioStyles>;

// props

interface PigmentRadioProps extends RadioProps, SizeProps, StyleSlotsToStyleProps<RadioStylesReturnType> {}

interface PigmentRadioGroupProps extends RadioGroupProps, PigmentFieldBaseProps {
  orientation?: Orientation;
  itemClassNames?: PigmentRadioProps["classNames"];
  itemStyles?: PigmentRadioProps["styles"];
}

// slots

interface RadioGroupSlotsType extends Pick<PigmentRadioGroupProps, "size" | "itemClassNames" | "itemStyles"> {}

const [RadioGroupSlotsProvider, useRadioGroupSlots] = createSlots<RadioGroupSlotsType>();

// component

function _RadioGroup(props: PigmentRadioGroupProps, ref: ForwardedRef<HTMLInputElement>) {
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

function _Radio(props: PigmentRadioProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { size = "md", children, classNames, itemClassNames, styles, itemStyles } = useRadioGroupSlots(props);

  const styleSlots = radioStyles({ size });

  return (
    <AriaRadio
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className) =>
        styleSlots.base({ className: twMerge(itemClassNames?.base, classNames?.base, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.base, styles?.base, style))}
    >
      {({ isSelected, isInvalid, isHovered, isPressed, isDisabled, isFocusVisible }) => (
        <>
          <div
            className={styleSlots.self({
              isSelected,
              isInvalid,
              isHovered,
              isPressed,
              isDisabled,
              isFocusVisible,
              className: twMerge(itemClassNames?.self, classNames?.self),
            })}
            style={mergeProps(itemStyles?.self, styles?.self)}
          />
          {children}
        </>
      )}
    </AriaRadio>
  );
}

const Radio = forwardRef(_Radio);

// exports

export { RadioGroup, Radio };
export type { PigmentRadioGroupProps, PigmentRadioProps };
