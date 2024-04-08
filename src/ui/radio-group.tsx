"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps, Orientation } from "react-aria";
import { Radio as AriaRadio, RadioGroup as AriaRadioGroup, RadioGroupProps, RadioProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants } from "./styles";
import { FilterProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "#/ui/utils";
import { Field, PigmentFieldBaseProps } from "#/ui/field";

// styles

const radioGroupStyles = tv({
  base: "flex",
  variants: {
    size: {
      sm: "py-1.5 gap-1.5",
      md: "py-2 gap-2",
      lg: "py-2.5 gap-2.5",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
});

const radioStyles = tv({
  slots: {
    base: "flex items-center",
    box: "grid place-items-center border border-default-1000 border-opacity-50 rounded-full",
  },
  variants: {
    size: {
      sm: { base: "text-sm gap-x-1.5", box: "size-5 [&>svg]:size-4" },
      md: { base: "text-base gap-x-2", box: "size-6 [&>svg]:size-5" },
      lg: { base: "text-lg gap-x-2.5", box: "size-7 [&>svg]:size-6" },
    },
    isSelected: { true: { box: "border-8 border-opacity-100" } },
    isInvalid: { true: { box: "border-error-500" } },
    isHovered: { true: { box: "border-opacity-100" } },
    isPressed: { true: { box: "scale-90" } },
    isFocusVisible: { true: { box: isFocusVisibleVariants.isFocusVisible.true } },
    ...isDisabledVariants,
  },
  compoundVariants: [{ isSelected: true, isHovered: true, className: { box: "border-opacity-80" } }],
});

type RadioStylesReturnType = ReturnType<typeof radioStyles>;

// props

interface PigmentRadioProps extends FilterProps<RadioProps>, SizeProps, StyleSlotsToStyleProps<RadioStylesReturnType> {}

interface PigmentRadioGroupProps extends FilterProps<RadioGroupProps>, PigmentFieldBaseProps {
  orientation?: Orientation;
  radioItemClassNames?: PigmentRadioProps["classNames"];
  radioItemStyles?: PigmentRadioProps["styles"];
}

// slots

interface RadioGroupSlotsType extends Pick<PigmentRadioGroupProps, "size" | "radioItemClassNames" | "radioItemStyles"> {}

const [RadioGroupSlotsProvider, useRadioGroupSlots] = createSlots<RadioGroupSlotsType>();

// component

function _RadioGroup(props: PigmentRadioGroupProps, ref: ForwardedRef<HTMLInputElement>) {
  const { size = "md", orientation = "vertical", children, radioItemClassNames, radioItemStyles } = props;

  return (
    <RadioGroupSlotsProvider value={{ size, radioItemClassNames, radioItemStyles }}>
      <AriaRadioGroup ref={ref} {...props}>
        {(renderProps) => (
          <Field {...renderProps} {...props}>
            <div className={radioGroupStyles({ size, orientation })}>{children}</div>
          </Field>
        )}
      </AriaRadioGroup>
    </RadioGroupSlotsProvider>
  );
}

const RadioGroup = forwardRef(_RadioGroup);

function _Radio(props: PigmentRadioProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { size = "md", children, className, classNames, radioItemClassNames, style, styles, radioItemStyles } = useRadioGroupSlots(props);

  const styleSlots = radioStyles({ size });

  return (
    <AriaRadio
      ref={ref}
      {...props}
      className={styleSlots.base({ className: twMerge(radioItemClassNames?.base, classNames?.base, className) })}
      style={mergeProps(radioItemStyles?.base, styles?.base, style)}
    >
      {({ isSelected, isInvalid, isHovered, isPressed, isDisabled, isFocusVisible }) => (
        <>
          <div
            className={styleSlots.box({
              isSelected,
              isInvalid,
              isHovered,
              isPressed,
              isDisabled,
              isFocusVisible,
              className: twMerge(radioItemClassNames?.box, classNames?.box),
            })}
            style={mergeProps(radioItemStyles?.box, styles?.box)}
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
