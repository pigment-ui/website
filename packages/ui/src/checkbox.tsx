"use client";

import { Field, FieldBaseProps } from "./field";
import { useGlobalProps } from "./provider";
import { isDisabledVariants, isFocusVisibleVariants, smallRadiusVariants, useVariantAndColorStyles } from "./styles";
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

const useCheckboxGroupStyles = () =>
  tv({
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

const useCheckboxStyles = () =>
  tv({
    extend: useVariantAndColorStyles(),
    base: "[&>svg]:absolute [&>svg]:transition-transform [&>svg]:duration-150",
    slots: {
      wrapper: "text-default grid cursor-pointer grid-cols-[auto_1fr] items-start duration-300",
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

type CheckboxStylesReturnType = ReturnType<ReturnType<typeof useCheckboxStyles>>;

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
  const globalProps = useGlobalProps("CheckboxGroup", props, {
    variant: "solid",
    color: "default",
    size: "md",
    radius: props.size || "md",
    orientation: "vertical",
  });

  const { variant, color, size, radius, orientation, itemClassNames, itemStyles } = globalProps;

  return (
    <CheckboxGroupSlotsProvider value={{ variant, color, size, radius, itemClassNames, itemStyles }}>
      <AriaCheckboxGroup ref={ref} {...globalProps}>
        {composeRenderProps(globalProps.children, (children, renderProps) => (
          <Field {...renderProps} {...globalProps}>
            <div className={useCheckboxGroupStyles()({ size, orientation })}>{children}</div>
          </Field>
        ))}
      </AriaCheckboxGroup>
    </CheckboxGroupSlotsProvider>
  );
}

const CheckboxGroup = forwardRef(_CheckboxGroup);

function _Checkbox(props: CheckboxProps, ref: ForwardedRef<HTMLLabelElement>) {
  const globalProps = useGlobalProps("Checkbox", useCheckboxGroupSlots(props), {
    variant: "solid",
    color: "default",
    size: "md",
    radius: props.size || "md",
  });

  const { variant, color, size, radius, classNames, itemClassNames, styles, itemStyles } = globalProps;

  const styleSlots = useCheckboxStyles()({ size, radius });

  return (
    <AriaCheckbox
      ref={ref}
      {...globalProps}
      className={composeRenderProps(props.className, (className, { isInvalid, isDisabled }) =>
        styleSlots.wrapper({ isInvalid, isDisabled, className: twMerge(itemClassNames?.wrapper, classNames?.wrapper, className) }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.wrapper, styles?.wrapper, style))}
    >
      {composeRenderProps(globalProps.children, (children, { isSelected, isIndeterminate, isInvalid, isHovered, isPressed, isFocusVisible }) => (
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
        twMerge("underline outline-none", isHovered && "decoration-double", isFocusVisible && isFocusVisibleVariants.true, className),
      )}
    />
  );
}

const CheckboxLink = forwardRef(_CheckboxLink);

// exports

export { CheckboxGroup, Checkbox, CheckboxLink, useCheckboxGroupStyles, useCheckboxStyles, CheckboxGroupSlotsProvider, useCheckboxGroupSlots };
export type { CheckboxStylesReturnType, CheckboxGroupSlotsType };
