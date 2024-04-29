"use client";

import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Checkbox as AriaCheckbox, CheckboxProps as AriaCheckboxProps, composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { CheckIcon, MinusIcon } from "lucide-react";

import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants } from "./styles";
import { RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";

import { useCheckboxGroupSlots } from "./checkbox-group";

// styles

const checkboxStyles = tv({
  slots: {
    base: "grid grid-cols-[auto_1fr] items-center cursor-pointer duration-300",
    self: "grid place-items-center bg-default-1000 bg-opacity-0 border border-default-1000 border-opacity-50 text-default-0 duration-300",
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
    isSelected: { true: { self: "border-none bg-opacity-100" } },
    isIndeterminate: { true: { self: "border-none bg-opacity-100" } },
    isInvalid: { true: { base: "text-error-500", self: "border-error-500" } },
    isHovered: { true: { self: "border-opacity-100" } },
    isPressed: { true: { self: "scale-90" } },
    isFocusVisible: { true: { self: isFocusVisibleVariants.isFocusVisible.true } },
    ...isDisabledVariants,
  },
  compoundVariants: [
    { isSelected: true, isHovered: true, className: { self: "bg-opacity-90" } },
    { isSelected: true, isInvalid: true, className: { self: "bg-error-500" } },
    { isIndeterminate: true, isInvalid: true, className: { self: "bg-error-500" } },
  ],
});

type CheckboxStylesReturnType = ReturnType<typeof checkboxStyles>;

// props

interface CheckboxProps extends AriaCheckboxProps, SizeProps, RadiusProps, StyleSlotsToStyleProps<CheckboxStylesReturnType> {}

// component

function _Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLLabelElement>) {
  const { size = "md", radius = "md", classNames, itemClassNames, styles, itemStyles } = useCheckboxGroupSlots(props);

  const styleSlots = checkboxStyles({ size, radius });

  return (
    <AriaCheckbox
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, { isInvalid, isDisabled }) =>
        styleSlots.base({ isInvalid, isDisabled, className: twMerge(itemClassNames?.base, classNames?.base, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.base, styles?.base, style))}
    >
      {composeRenderProps(props.children, (children, { isSelected, isIndeterminate, isInvalid, isHovered, isPressed, isFocusVisible }) => (
        <>
          <div
            className={styleSlots.self({
              isSelected,
              isIndeterminate,
              isInvalid,
              isHovered,
              isPressed,
              isFocusVisible,
              className: twMerge(itemClassNames?.self, classNames?.self),
            })}
            style={mergeProps(itemStyles?.self, styles?.self)}
          >
            {isSelected ? <CheckIcon /> : isIndeterminate ? <MinusIcon /> : null}
          </div>
          <div>{children}</div>
        </>
      ))}
    </AriaCheckbox>
  );
}

const Checkbox = forwardRef(_Checkbox);

// exports

export { Checkbox };
export type { CheckboxProps };
