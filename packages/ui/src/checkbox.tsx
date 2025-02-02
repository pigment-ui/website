"use client";

import { useCheckboxGroupSlots } from "./checkbox-group";
import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants } from "./styles";
import { RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import { Slot } from "@radix-ui/react-slot";
import { CheckIcon, MinusIcon } from "lucide-react";
import React, { AnchorHTMLAttributes, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Checkbox as AriaCheckbox, CheckboxProps as AriaCheckboxProps, composeRenderProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const checkboxStyles = tv({
  slots: {
    base: "grid cursor-pointer grid-cols-[auto_1fr] items-start duration-300",
    self: "grid place-items-center rounded-[inherit] border border-default-1000 border-opacity-50 bg-default-1000 bg-opacity-0 text-default-0 duration-300",
  },
  variants: {
    size: {
      sm: { base: "gap-x-1.5 text-sm", self: "size-5 [&>svg]:size-4" },
      md: { base: "gap-x-2 text-base", self: "size-6 [&>svg]:size-5" },
      lg: { base: "gap-x-2.5 text-lg", self: "size-7 [&>svg]:size-6" },
    },
    isSelected: { true: { self: "border-none bg-opacity-100" } },
    isIndeterminate: { true: { self: "border-none bg-opacity-100" } },
    isInvalid: { true: { base: "text-error-500", self: "border-error-500" } },
    isHovered: { true: { self: "border-opacity-100" } },
    isPressed: { true: { self: "scale-90" } },
    isFocusVisible: { true: { self: isFocusVisibleVariants.true } },
    isDisabled: isDisabledVariants,
    radius: smallRadiusVariants,
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
  const { size = "md", radius = size, classNames, itemClassNames, styles, itemStyles } = useCheckboxGroupSlots(props);

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

function _CheckboxLink(props: AnchorHTMLAttributes<HTMLAnchorElement> & { asChild?: boolean }, ref: ForwardedRef<HTMLAnchorElement>) {
  const Component = props.asChild ? Slot : "a";

  return (
    <Component
      ref={ref}
      tabIndex={-1}
      target="_blank"
      onClick={(e) => e.stopPropagation()}
      {...props}
      className={twMerge("text-primary hover:underline", props.className)}
    />
  );
}

const CheckboxLink = forwardRef(_CheckboxLink);

// exports

export { Checkbox, CheckboxLink };
