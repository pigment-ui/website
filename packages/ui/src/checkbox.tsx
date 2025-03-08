"use client";

import { useCheckboxGroupSlots } from "./checkbox-group";
import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, RadiusProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { CheckIcon, MinusIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Checkbox as AriaCheckbox, CheckboxProps as AriaCheckboxProps, composeRenderProps, Link } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const checkboxStyles = tv({
  extend: variantColorStyles,
  base: "[&>svg]:absolute [&>svg]:transition-transform [&>svg]:duration-150",
  slots: {
    wrapper: "grid cursor-pointer grid-cols-[auto_1fr] items-start duration-300",
  },
  variants: {
    size: {
      sm: { base: "size-5 [&>svg]:size-4", wrapper: "gap-x-1.5 text-sm" },
      md: { base: "size-6 [&>svg]:size-5", wrapper: "gap-x-2 text-base" },
      lg: { base: "size-7 [&>svg]:size-6", wrapper: "gap-x-2.5 text-lg" },
    },
    isInvalid: { true: { wrapper: "text-error" } },
    isDisabled: { true: { wrapper: isDisabledVariants.true } },
    isPressed: { true: "scale-90" },
    radius: smallRadiusVariants,
  },
});

type CheckboxStylesReturnType = ReturnType<typeof checkboxStyles>;

// props

interface CheckboxProps
  extends AriaCheckboxProps,
    VariantProps,
    ColorProps,
    SizeProps,
    RadiusProps,
    StyleSlotsToStyleProps<CheckboxStylesReturnType> {}

// component

function _Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLLabelElement>) {
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = size,
    classNames,
    itemClassNames,
    styles,
    itemStyles,
  } = useCheckboxGroupSlots(props);

  const styleSlots = checkboxStyles({ size, radius });

  return (
    <AriaCheckbox
      ref={ref}
      {...props}
      className={composeRenderProps(props.className, (className, { isInvalid, isDisabled }) =>
        styleSlots.wrapper({ isInvalid, isDisabled, className: twMerge(itemClassNames?.wrapper, classNames?.wrapper, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.base, styles?.base, style))}
    >
      {composeRenderProps(props.children, (children, { isSelected, isIndeterminate, isInvalid, isHovered, isPressed, isFocusVisible }) => (
        <>
          <div
            className={styleSlots.base({
              variant: isSelected || isIndeterminate ? variant : "outlined",
              color: isInvalid ? "error" : color,
              isHovered,
              isPressed,
              isFocusVisible,
              className: twMerge(itemClassNames?.base, classNames?.base),
            })}
            style={mergeProps(itemStyles?.base, styles?.base)}
          >
            <CheckIcon aria-hidden={!isSelected} className={twMerge(!isSelected && "scale-0")} />
            <MinusIcon aria-hidden={!isSelected} className={twMerge(!isIndeterminate && "scale-0")} />
          </div>
          <div>{children}</div>
        </>
      ))}
    </AriaCheckbox>
  );
}

const Checkbox = forwardRef(_Checkbox);

function _CheckboxLink(props: ComponentPropsWithoutRef<typeof Link>, ref: ForwardedRef<HTMLAnchorElement>) {
  return (
    <Link
      ref={ref}
      target="_blank"
      {...props}
      className={composeRenderProps(props.className, (className, { isHovered, isFocusVisible }) =>
        twMerge(
          "underline",
          isHovered && "decoration-double",
          isFocusVisible ? isFocusVisibleVariants.true : isFocusVisibleVariants.false,
          className,
        ),
      )}
    />
  );
}

const CheckboxLink = forwardRef(_CheckboxLink);

// exports

export { Checkbox, CheckboxLink, checkboxStyles };
export type { CheckboxStylesReturnType };
