"use client";

import { useGlobalProps } from "./provider";
import { isDisabledVariants, isFocusVisibleVariants, radiusVariants, smallRadiusVariants, useVariantAndColorStyles } from "./styles";
import { ChildrenProps, ColorProps, RadiusProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { useObjectRef } from "@react-aria/utils";
import { ValidationResult } from "@react-types/shared";
import React, { cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { FieldError, Group, Label, Text } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const useFieldStyles = () =>
  tv({
    slots: {
      base: "relative flex size-full flex-col",
      label: "text-default cursor-default",
      description: "text-default",
      errorMessage: "text-error",
    },
    variants: {
      size: {
        sm: { label: "pb-0.5 text-xs", description: "pt-0.5 text-xs", errorMessage: "pt-0.5 text-xs" },
        md: { label: "pb-1 text-sm", description: "pt-1 text-sm", errorMessage: "pt-1 text-sm" },
        lg: { label: "pb-1.5 text-base", description: "pt-1.5 text-base", errorMessage: "pt-1.5 text-base" },
      },
    },
  });

type FieldStylesReturnType = ReturnType<ReturnType<typeof useFieldStyles>>;

const useFieldButtonStyles = () =>
  tv({
    base: [
      "relative flex min-w-max items-center justify-center overflow-hidden whitespace-nowrap outline-none duration-300",
      "before:absolute before:inset-0 before:bg-current before:duration-300 data-[pressed]:scale-90",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[focus-visible]:outline-offset-0 data-[focus-visible]:outline-current",
    ],
    variants: {
      variant: {
        soft: "before:opacity-10 data-[hovered]:before:opacity-20",
        light: "before:opacity-0 data-[hovered]:before:opacity-10",
      },
    },
    defaultVariants: { variant: "soft" },
  });

export const useFieldSegmentStyles = () =>
  tv({
    base: useFieldButtonStyles()({ variant: "light", className: ["p-1", smallRadiusVariants.md] }),
    variants: { isPlaceholder: { true: "opacity-50 data-[focused]:opacity-100 data-[focused]:before:opacity-20" } },
  });

const useFieldInputStyles = () =>
  tv({
    extend: useVariantAndColorStyles(),
    base: "cursor-text",
    slots: {
      wrapper: "flex size-full flex-1 flex-col",
      self: "flex size-full flex-1 items-center bg-transparent outline-none placeholder:text-inherit placeholder:opacity-50 data-[disabled]:pointer-events-none [&[aria-disabled]]:pointer-events-none",
      content: "pointer-events-none shrink-0",
      button: useFieldButtonStyles()({ className: "px-1.5" }),
    },
    variants: {
      size: {
        sm: { base: "gap-2 px-2 text-xs [&_svg]:size-4", self: "h-8", button: "h-6 [&_svg]:!size-3" },
        md: { base: "gap-2.5 px-2.5 text-sm [&_svg]:size-5", self: "h-10", button: "h-7 [&_svg]:!size-4" },
        lg: { base: "gap-3 px-3 text-base [&_svg]:size-6", self: "h-12", button: "h-8 [&_svg]:!size-5" },
      },
      radius: {
        sm: { base: radiusVariants.sm, button: smallRadiusVariants.sm },
        md: { base: radiusVariants.md, button: smallRadiusVariants.md },
        lg: { base: radiusVariants.lg, button: smallRadiusVariants.lg },
        full: { base: radiusVariants.full, button: smallRadiusVariants.full },
        none: { base: radiusVariants.none, button: smallRadiusVariants.none },
      },
      isAutoHeight: { true: { self: "h-auto" } },
      isHovered: { true: "" },
      isFocusWithin: { true: "ring-2" },
      isFocusVisible: isFocusVisibleVariants,
      isDisabled: isDisabledVariants,
    },
    compoundVariants: [
      { isAutoHeight: true, size: "sm", className: "py-2" },
      { isAutoHeight: true, size: "md", className: "py-2.5" },
      { isAutoHeight: true, size: "lg", className: "py-3" },

      { color: "default", isFocusWithin: true, className: { base: "ring-default" } },
      { color: "primary", isFocusWithin: true, className: { base: "ring-primary" } },
      { color: "secondary", isFocusWithin: true, className: { base: "ring-secondary" } },
      { color: "info", isFocusWithin: true, className: { base: "ring-info" } },
      { color: "success", isFocusWithin: true, className: { base: "ring-success" } },
      { color: "warning", isFocusWithin: true, className: { base: "ring-warning" } },
      { color: "error", isFocusWithin: true, className: { base: "ring-error" } },
    ],
  });

type FieldInputStylesReturnType = ReturnType<ReturnType<typeof useFieldInputStyles>>;

// props

interface FieldBaseProps extends SizeProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validationResult: ValidationResult) => ReactNode);
  isRequired?: boolean;
  isInvalid?: boolean;
  fieldClassNames?: StyleSlotsToStyleProps<FieldStylesReturnType>["classNames"];
  fieldStyles?: StyleSlotsToStyleProps<FieldStylesReturnType>["styles"];
}

interface FieldProps extends FieldBaseProps, ChildrenProps {}

interface FieldInputBaseProps extends VariantProps, ColorProps, SizeProps, RadiusProps, FieldBaseProps {
  isLabelInside?: boolean;
  startContent?: ReactElement;
  endContent?: ReactElement;
  fieldInputClassNames?: StyleSlotsToStyleProps<FieldInputStylesReturnType>["classNames"];
  fieldInputStyles?: StyleSlotsToStyleProps<FieldInputStylesReturnType>["styles"];
}

interface FieldInputProps extends FieldInputBaseProps {
  isAutoHeight?: boolean;
  isFocusWithin?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  children?: ReactElement;
  startButton?: ReactElement;
  endButton?: ReactElement;
}

// component

function _Field(props: FieldProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("Field", props, { size: "md" });

  const { label, description, errorMessage, isRequired, size, children, fieldClassNames, fieldStyles: fieldStylesFromProps } = globalProps;

  const styleSlots = useFieldStyles()({ size });

  return (
    <div ref={ref} className={styleSlots.base({ className: fieldClassNames?.base })} style={fieldStylesFromProps?.base}>
      {label && (
        <Label className={styleSlots.label({ className: fieldClassNames?.label })} style={fieldStylesFromProps?.label}>
          {label}
          {isRequired && <span> *</span>}
        </Label>
      )}

      {children}

      {description && (
        <Text
          slot="description"
          className={styleSlots.description({ className: fieldClassNames?.description })}
          style={fieldStylesFromProps?.description}
        >
          {description}
        </Text>
      )}

      <FieldError className={styleSlots.errorMessage({ className: fieldClassNames?.errorMessage })} style={fieldStylesFromProps?.errorMessage}>
        {errorMessage}
      </FieldError>
    </div>
  );
}

const Field = forwardRef(_Field);

function _FieldInput(props: FieldInputProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("FieldInput", props, {
    variant: "soft",
    color: "default",
    size: "md",
    radius: props.size || "md",
    isLabelInside: true,
  });

  const {
    variant,
    color,
    size,
    radius,
    isInvalid,
    isDisabled,
    isAutoHeight,
    isFocusWithin: isFocusWithinProps,
    isLabelInside,
    startContent,
    endContent,
    startButton,
    endButton,
    children,
    fieldInputClassNames,
    fieldInputStyles,
  } = globalProps;

  const styleSlots = useFieldInputStyles()({
    variant,
    color: isInvalid ? "error" : color,
    size,
    radius,
    isAutoHeight: isAutoHeight || isLabelInside,
  });

  // @ts-ignore
  const selfRef = useObjectRef<HTMLElement>(children?.ref);

  return (
    <Field {...globalProps} label={isLabelInside ? "" : globalProps.label}>
      <Group
        ref={ref}
        isInvalid={isInvalid}
        isDisabled={isDisabled}
        className={({ isHovered, isDisabled, isFocusVisible, isFocusWithin }) =>
          styleSlots.base({
            isHovered: isHovered || isFocusWithin || isFocusWithinProps,
            isFocusWithin: isFocusWithin || isFocusWithinProps,
            isDisabled,
            isFocusVisible,
            className: fieldInputClassNames?.base,
          })
        }
        style={fieldInputStyles?.base}
        onClick={() => {
          selfRef.current?.focus();
          selfRef.current?.click();
        }}
      >
        {startButton &&
          cloneElement(startButton, {
            className: styleSlots.button({ className: twMerge(startButton.props?.className, fieldInputClassNames?.button) }),
            style: mergeProps(startButton.props?.style, fieldInputStyles?.button),
          })}

        {startContent &&
          cloneElement(startContent, {
            className: styleSlots.content({ className: twMerge("mr-0", startContent.props?.className, fieldInputClassNames?.content) }),
            style: mergeProps(startContent.props?.style, fieldInputStyles?.content),
          })}

        <div className={styleSlots.wrapper({ className: fieldInputClassNames?.wrapper })} style={fieldInputStyles?.wrapper}>
          {isLabelInside && (
            <Label
              className={useFieldStyles()({ size }).label({
                className: twMerge("pointer-events-none text-inherit", globalProps.fieldClassNames?.label),
              })}
              style={globalProps.fieldStyles?.label}
            >
              {globalProps.label}
              {globalProps.isRequired && <span> *</span>}
            </Label>
          )}
          {children &&
            cloneElement(children, {
              ref: selfRef,
              className: styleSlots.self({ className: twMerge(children.props?.className, fieldInputClassNames?.self) }),
              style: mergeProps(children.props?.style, fieldInputStyles?.self),
            })}
        </div>

        {endContent &&
          cloneElement(endContent, {
            className: styleSlots.content({ className: twMerge("ml-0", endContent.props?.className, fieldInputClassNames?.content) }),
            style: mergeProps(endContent.props?.style, fieldInputStyles?.content),
          })}

        {endButton &&
          cloneElement(endButton, {
            className: styleSlots.button({ className: twMerge(endButton.props?.className, fieldInputClassNames?.button) }),
            style: mergeProps(endButton.props?.style, fieldInputStyles?.button),
          })}
      </Group>
    </Field>
  );
}

const FieldInput = forwardRef(_FieldInput);

// exports

export { Field, FieldInput, useFieldStyles, useFieldInputStyles, useFieldButtonStyles };
export type { FieldBaseProps, FieldInputBaseProps };
