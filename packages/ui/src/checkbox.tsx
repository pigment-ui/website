"use client";

import { Field, FieldBaseProps } from "./field";
import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, RadiusProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { createSlots } from "./utils";
import { CheckIcon, MinusIcon } from "lucide-react";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from "react";
import { mergeProps, Orientation } from "react-aria";
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  CheckboxGroupProps as AriaCheckboxGroupProps,
  CheckboxProps as AriaCheckboxProps,
  composeRenderProps,
  Link,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const checkboxGroupStyles = tv({
  base: "flex",
  variants: {
    size: {
      sm: "gap-1.5 py-1.5",
      md: "gap-2 py-2",
      lg: "gap-2.5 py-2.5",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
  },
});

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

interface CheckboxGroupProps extends AriaCheckboxGroupProps, FieldBaseProps, VariantProps, ColorProps, RadiusProps {
  orientation?: Orientation;
  itemClassNames?: ComponentPropsWithoutRef<typeof Checkbox>["classNames"];
  itemStyles?: ComponentPropsWithoutRef<typeof Checkbox>["styles"];
}

interface CheckboxProps
  extends AriaCheckboxProps,
    VariantProps,
    ColorProps,
    SizeProps,
    RadiusProps,
    StyleSlotsToStyleProps<CheckboxStylesReturnType> {}

// slots

interface CheckboxGroupSlotsType extends Pick<CheckboxGroupProps, "variant" | "color" | "size" | "radius" | "itemClassNames" | "itemStyles"> {}

const [CheckboxGroupSlotsProvider, useCheckboxGroupSlots] = createSlots<CheckboxGroupSlotsType>();

// component

function _CheckboxGroup(props: CheckboxGroupProps, ref: ForwardedRef<HTMLInputElement>) {
  const { variant = "soft", color = "default", size = "md", radius = size, orientation = "vertical", itemClassNames, itemStyles } = props;

  return (
    <CheckboxGroupSlotsProvider value={{ variant, color, size, radius, itemClassNames, itemStyles }}>
      <AriaCheckboxGroup ref={ref} {...props}>
        {composeRenderProps(props.children, (children, renderProps) => (
          <Field {...renderProps} {...props}>
            <div className={checkboxGroupStyles({ size, orientation })}>{children}</div>
          </Field>
        ))}
      </AriaCheckboxGroup>
    </CheckboxGroupSlotsProvider>
  );
}

const CheckboxGroup = forwardRef(_CheckboxGroup);

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
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.wrapper, styles?.wrapper, style))}
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

export { CheckboxGroup, Checkbox, CheckboxLink, checkboxGroupStyles, checkboxStyles };
export type { CheckboxStylesReturnType, CheckboxGroupSlotsType };
