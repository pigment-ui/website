"use client";

import { Slot, Slottable } from "@radix-ui/react-slot";
import { useObjectRef } from "@react-aria/utils";
import { ForwardedRef, forwardRef } from "react";
import { AriaButtonProps, mergeProps, useButton, useFocusRing, useHover } from "react-aria";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

import {
  isDisabledVariants,
  isFocusVisibleVariants,
  isPressedVariants,
  radiusVariants,
  variantAndColorCompoundVariants,
  variantAndColorVariants,
} from "./styles";
import { AsChildProps, ChildrenProps, ColorProps, ContentProps, RadiusProps, SizeProps, StyleProps, VariantProps } from "./types";

import { Spinner } from "./spinner";

// styles

const buttonStyles = tv({
  base: "relative flex items-center justify-center min-w-max whitespace-nowrap overflow-hidden",
  variants: {
    ...variantAndColorVariants,
    ...radiusVariants,
    ...isPressedVariants,
    ...isDisabledVariants,
    ...isFocusVisibleVariants,
    size: {
      sm: "h-8 gap-x-2 px-4 text-xs [&_svg]:h-4 [&_svg]:w-4",
      md: "h-10 gap-x-2.5 px-5 text-sm [&_svg]:h-5 [&_svg]:w-5",
      lg: "h-12 gap-x-3 px-6 text-base [&_svg]:h-6 [&_svg]:w-6",
    },
    isIconOnly: { true: "" },
    isLoading: { true: "!text-transparent" },
    isHovered: { true: "" },
  },
  compoundVariants: [
    ...variantAndColorCompoundVariants,
    { size: "sm", isIconOnly: true, className: "px-2" },
    { size: "md", isIconOnly: true, className: "px-2.5" },
    { size: "lg", isIconOnly: true, className: "px-3" },
    { variant: "solid", isHovered: true, className: "bg-opacity-90" },
    { variant: "soft", isHovered: true, className: "bg-opacity-20" },
    { variant: "light", isHovered: true, className: "bg-opacity-10" },
    { variant: "bordered", isHovered: true, className: "bg-opacity-10" },
    { variant: "faded", isHovered: true, className: "bg-default-200" },
  ],
});

// props

interface PigmentButtonProps
  extends AriaButtonProps,
    VariantProps,
    ColorProps,
    SizeProps,
    RadiusProps,
    ContentProps,
    AsChildProps,
    ChildrenProps,
    StyleProps {
  isIconOnly?: boolean;
  isLoading?: boolean;
}

// component

function _Button(props: PigmentButtonProps, ref: ForwardedRef<HTMLButtonElement>) {
  const {
    variant = "solid",
    color = "default",
    size = "md",
    radius = "md",
    startContent,
    endContent,
    isLoading,
    isDisabled: disabled,
    isIconOnly,
    asChild,
    children,
    className,
    style,
    ...restProps
  } = props;

  const isDisabled = disabled || isLoading;

  const objRef = useObjectRef(ref);
  const { buttonProps, isPressed } = useButton({ ...restProps, isDisabled }, objRef);
  const { hoverProps, isHovered } = useHover({ isDisabled });
  const { focusProps, isFocusVisible } = useFocusRing();

  const Component = asChild ? Slot : "button";

  return (
    <Component
      ref={objRef}
      {...mergeProps(buttonProps, hoverProps, focusProps)}
      className={buttonStyles({ variant, color, size, radius, isIconOnly, isLoading, isHovered, isPressed, isDisabled, isFocusVisible, className })}
      style={style}
    >
      {isLoading && (
        <div className={twMerge("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2", variant === "solid" && "invert")}>
          <Spinner size={size} color={variant === "solid" ? "default" : color} />
        </div>
      )}

      {startContent}
      <Slottable>{children}</Slottable>
      {endContent}
    </Component>
  );
}

const Button = forwardRef(_Button);

// exports

export { Button };
export type { PigmentButtonProps };
