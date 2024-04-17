"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Checkbox as AriaCheckbox, CheckboxProps, composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { CheckIcon, MinusIcon } from "./icons";
import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants } from "./styles";
import { RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";

import { useCheckboxGroupSlots } from "./checkbox-group";

// styles

const checkboxStyles = tv({
  slots: {
    base: "flex items-center",
    self: "grid place-items-center border border-default-1000 border-opacity-50",
  },
  variants: {
    size: {
      sm: { base: "text-sm gap-x-1.5", self: "size-5 [&>svg]:size-4" },
      md: { base: "text-base gap-x-2", self: "size-6 [&>svg]:size-5" },
      lg: { base: "text-lg gap-x-2.5", self: "size-7 [&>svg]:size-6" },
    },
    radius: {
      sm: { self: smallRadiusVariants.radius.sm },
      md: { self: smallRadiusVariants.radius.md },
      lg: { self: smallRadiusVariants.radius.lg },
      full: { self: smallRadiusVariants.radius.full },
      none: { self: smallRadiusVariants.radius.none },
    },
    isSelected: { true: { self: "border-none bg-default-1000 text-default-0" } },
    isIndeterminate: { true: { self: "border-none bg-default-1000 text-default-0" } },
    isInvalid: { true: { self: "border-error-500" } },
    isHovered: { true: { self: "border-opacity-100 bg-opacity-90" } },
    isPressed: { true: { self: "scale-90" } },
    isFocusVisible: { true: { self: isFocusVisibleVariants.isFocusVisible.true } },
    ...isDisabledVariants,
  },
  compoundVariants: [
    { isSelected: true, isInvalid: true, className: { self: "bg-error-500" } },
    { isIndeterminate: true, isInvalid: true, className: { self: "bg-error-500" } },
  ],
});

type CheckboxStylesReturnType = ReturnType<typeof checkboxStyles>;

// props

interface PigmentCheckboxProps extends CheckboxProps, SizeProps, RadiusProps, StyleSlotsToStyleProps<CheckboxStylesReturnType> {}

// component

function _Checkbox(props: PigmentCheckboxProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { size = "md", radius = "md", classNames, itemClassNames, styles, itemStyles } = useCheckboxGroupSlots(props);

  const styleSlots = checkboxStyles({ size, radius });

  return (
    <AriaCheckbox
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className) =>
        styleSlots.base({ className: twMerge(itemClassNames?.base, classNames?.base, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.base, styles?.base, style))}
    >
      {composeRenderProps(
        props.children,
        (children, { isSelected, isIndeterminate, isInvalid, isHovered, isPressed, isDisabled, isFocusVisible }) => (
          <>
            <div
              className={styleSlots.self({
                isSelected,
                isIndeterminate,
                isInvalid,
                isHovered,
                isPressed,
                isDisabled,
                isFocusVisible,
                className: twMerge(itemClassNames?.self, classNames?.self),
              })}
              style={mergeProps(itemStyles?.self, styles?.self)}
            >
              {isSelected ? <CheckIcon /> : isIndeterminate ? <MinusIcon /> : null}
            </div>
            {children}
          </>
        ),
      )}
    </AriaCheckbox>
  );
}

const Checkbox = forwardRef(_Checkbox);

// exports

export { Checkbox };
export type { PigmentCheckboxProps };
