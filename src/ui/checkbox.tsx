"use client";

import { CheckIcon, MinusIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Checkbox as AriaCheckbox, CheckboxProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants } from "./styles";
import { FilterProps, RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";

import { useCheckboxGroupSlots } from "./checkbox-group";

// styles

const checkboxStylesTv = tv({
  slots: {
    base: "flex items-center",
    box: "grid place-items-center border border-default-1000 border-opacity-50",
  },
  variants: {
    size: {
      sm: { base: "text-sm gap-x-1.5", box: "size-5 [&>svg]:size-4" },
      md: { base: "text-base gap-x-2", box: "size-6 [&>svg]:size-5" },
      lg: { base: "text-lg gap-x-2.5", box: "size-7 [&>svg]:size-6" },
    },
    radius: {
      sm: { box: smallRadiusVariants.radius.sm },
      md: { box: smallRadiusVariants.radius.md },
      lg: { box: smallRadiusVariants.radius.lg },
      full: { box: smallRadiusVariants.radius.full },
      none: { box: smallRadiusVariants.radius.none },
    },
    isSelected: { true: { box: "border-none bg-default-1000 text-default-0" } },
    isIndeterminate: { true: { box: "border-none bg-default-1000 text-default-0" } },
    isInvalid: { true: { box: "border-error-500" } },
    isHovered: { true: { box: "border-opacity-100 bg-opacity-90" } },
    isPressed: { true: { box: "scale-90" } },
    isFocusVisible: { true: { box: isFocusVisibleVariants.isFocusVisible.true } },
    ...isDisabledVariants,
  },
  compoundVariants: [
    { isSelected: true, isInvalid: true, className: { box: "bg-error-500" } },
    { isIndeterminate: true, isInvalid: true, className: { box: "bg-error-500" } },
  ],
});

type CheckboxStylesReturnType = ReturnType<typeof checkboxStylesTv>;

// props

interface PigmentCheckboxProps extends FilterProps<CheckboxProps>, SizeProps, RadiusProps, StyleSlotsToStyleProps<CheckboxStylesReturnType> {}

// component

function _Checkbox(props: PigmentCheckboxProps, ref: ForwardedRef<HTMLLabelElement>) {
  const {
    size = "md",
    radius = "md",
    children,
    className,
    classNames,
    checkboxClassNames,
    style,
    styles,
    checkboxStyles,
  } = useCheckboxGroupSlots(props);

  const styleSlots = checkboxStylesTv({ size, radius });

  return (
    <AriaCheckbox
      ref={ref}
      {...props}
      className={styleSlots.base({ className: twMerge(checkboxClassNames?.base, classNames?.base, className) })}
      style={mergeProps(checkboxStyles?.base, styles?.base, style)}
    >
      {({ isSelected, isIndeterminate, isInvalid, isHovered, isPressed, isDisabled, isFocusVisible }) => (
        <>
          <div
            className={styleSlots.box({
              isSelected,
              isIndeterminate,
              isInvalid,
              isHovered,
              isPressed,
              isDisabled,
              isFocusVisible,
              className: twMerge(checkboxClassNames?.box, classNames?.box),
            })}
            style={mergeProps(checkboxStyles?.box, styles?.box)}
          >
            {isSelected ? <CheckIcon /> : isIndeterminate ? <MinusIcon /> : null}
          </div>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}

const Checkbox = forwardRef(_Checkbox);

// exports

export { Checkbox };
export type { PigmentCheckboxProps };
