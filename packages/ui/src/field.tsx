"use client";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants, smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, RadiusProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { useObjectRef } from "@react-aria/utils";
import { ValidationResult } from "@react-types/shared";
import React, { cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { FieldError, Group, Label, Text } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const fieldStyles = tv({
  slots: {
    base: "relative flex size-full flex-col",
    label: "cursor-default",
    description: "",
    errorMessage: "text-error",
  },
  variants: {
    size: {
      sm: { base: "gap-y-0.5", label: "text-xs", description: "text-xs", errorMessage: "text-xs" },
      md: { base: "gap-y-1", label: "text-sm", description: "text-sm", errorMessage: "text-sm" },
      lg: { base: "gap-y-1.5", label: "text-base", description: "text-base", errorMessage: "text-base" },
    },
  },
});

type FieldStylesReturnType = ReturnType<typeof fieldStyles>;

const fieldInputStyles = tv({
  extend: variantColorStyles,
  base: "cursor-text",
  slots: {
    self: "flex size-full flex-1 items-center bg-transparent outline-none placeholder:text-inherit placeholder:opacity-50 data-[disabled]:pointer-events-none [&[aria-disabled]]:pointer-events-none",
    content: "pointer-events-none shrink-0",
    button: [
      "flex items-center bg-opacity-10 px-1.5 outline-none duration-300",
      "data-[pressed]:scale-90 data-[hovered]:bg-opacity-20",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "data-[focus-visible]:z-10 data-[focus-visible]:outline data-[focus-visible]:outline-default-1000",
    ],
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
    isTextArea: { true: { base: "items-start", self: "h-auto" } },
    isHovered: { true: "" },
    isFocusWithin: { true: "ring-2" },
    isFocusVisible: isFocusVisibleVariants,
    isDisabled: isDisabledVariants,
  },
  compoundVariants: [
    { isTextArea: true, size: "sm", className: "py-2" },
    { isTextArea: true, size: "md", className: "py-2.5" },
    { isTextArea: true, size: "lg", className: "py-3" },

    { color: "default", className: { button: "bg-default-1000" } },
    { color: "default", isFocusWithin: true, className: { base: "ring-default-1000" } },
    { color: "primary", className: { button: "bg-primary" } },
    { color: "primary", isFocusWithin: true, className: { base: "ring-primary" } },
    { color: "secondary", className: { button: "bg-secondary" } },
    { color: "secondary", isFocusWithin: true, className: { base: "ring-secondary" } },
    { color: "info", className: { button: "bg-info" } },
    { color: "info", isFocusWithin: true, className: { base: "ring-info" } },
    { color: "success", className: { button: "bg-success" } },
    { color: "success", isFocusWithin: true, className: { base: "ring-success" } },
    { color: "warning", className: { button: "bg-warning" } },
    { color: "warning", isFocusWithin: true, className: { base: "ring-warning" } },
    { color: "error", className: { button: "bg-error" } },
    { color: "error", isFocusWithin: true, className: { base: "ring-error" } },

    { variant: "solid", className: { button: "bg-default-0" } },
  ],
});

type FieldInputStylesReturnType = ReturnType<typeof fieldInputStyles>;

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

interface FieldProps extends FieldBaseProps {
  children?: ReactNode;
}

interface FieldInputBaseProps extends VariantProps, ColorProps, SizeProps, RadiusProps, FieldBaseProps {
  isLabelInside?: boolean;
  startContent?: ReactElement;
  endContent?: ReactElement;
  startButton?: ReactElement;
  endButton?: ReactElement;
  fieldInputClassNames?: StyleSlotsToStyleProps<FieldInputStylesReturnType>["classNames"];
  fieldInputStyles?: StyleSlotsToStyleProps<FieldInputStylesReturnType>["styles"];
}

interface FieldInputProps extends FieldInputBaseProps {
  isTextArea?: boolean;
  isFocusWithin?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  children?: ReactElement;
}

// component

function _Field(props: FieldProps, ref: ForwardedRef<HTMLDivElement>) {
  const { label, description, errorMessage, isRequired, size = "md", children, fieldClassNames, fieldStyles: fieldStylesFromProps } = props;

  const styleSlots = fieldStyles({ size });

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
  const {
    variant = "soft",
    color = "default",
    size = "md",
    radius = size,
    isInvalid,
    isDisabled,
    isTextArea = false,
    isFocusWithin: isFocusWithinProps,
    isLabelInside = true,
    startContent,
    endContent,
    startButton,
    endButton,
    children,
    fieldInputClassNames,
    fieldInputStyles: fieldInputStylesFromProps,
  } = props;

  const styleSlots = fieldInputStyles({ variant, color: isInvalid ? "error" : color, size, radius, isTextArea });

  // @ts-ignore
  const selfRef = useObjectRef<HTMLElement>(children?.ref);

  return (
    <Field
      {...props}
      fieldClassNames={{
        ...props.fieldClassNames,
        label: twMerge(
          isLabelInside &&
            twMerge(
              "absolute z-20 pointer-events-none",
              {
                default: variant === "solid" ? "text-default-0" : "text-default-1000",
                primary: variant === "solid" ? "text-primary-foreground" : "text-primary",
                secondary: variant === "solid" ? "text-secondary-foreground" : "text-secondary",
                info: variant === "solid" ? "text-info-foreground" : "text-info",
                success: variant === "solid" ? "text-success-foreground" : "text-success",
                warning: variant === "solid" ? "text-warning-foreground" : "text-warning",
                error: variant === "solid" ? "text-error-foreground" : "text-error",
              }[isInvalid ? "error" : color],
              {
                sm: "inset-x-2 top-2",
                md: "inset-x-2.5 top-2.5",
                lg: "inset-x-3 top-3",
              }[size],
            ),
          props.fieldClassNames?.label,
        ),
      }}
    >
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
        style={mergeProps(
          isLabelInside && props.label
            ? {
                // label height, input padding
                paddingTop: { sm: 16, md: 20, lg: 24 }[size] + { sm: 8, md: 10, lg: 12 }[size] * (isTextArea ? 2 : 1),
              }
            : {},
          fieldInputStylesFromProps?.base,
        )}
        onClick={() => {
          selfRef.current?.focus();
          selfRef.current?.click();
        }}
      >
        {startButton &&
          cloneElement(startButton, {
            className: styleSlots.button({ className: twMerge(startButton.props?.className, fieldInputClassNames?.button) }),
            style: mergeProps(startButton.props?.style, fieldInputStylesFromProps?.button),
          })}

        {startContent &&
          cloneElement(startContent, {
            className: styleSlots.content({ className: twMerge("mr-0", startContent.props?.className, fieldInputClassNames?.content) }),
            style: mergeProps(startContent.props?.style, fieldInputStylesFromProps?.content),
          })}

        {children &&
          cloneElement(children, {
            ref: selfRef,
            className: styleSlots.self({ className: twMerge(children.props?.className, fieldInputClassNames?.self) }),
            style: mergeProps(children.props?.style, fieldInputStylesFromProps?.self),
          })}

        {endContent &&
          cloneElement(endContent, {
            className: styleSlots.content({ className: twMerge("ml-0", endContent.props?.className, fieldInputClassNames?.content) }),
            style: mergeProps(endContent.props?.style, fieldInputStylesFromProps?.content),
          })}

        {endButton &&
          cloneElement(endButton, {
            className: styleSlots.button({ className: twMerge(endButton.props?.className, fieldInputClassNames?.button) }),
            style: mergeProps(endButton.props?.style, fieldInputStylesFromProps?.button),
          })}
      </Group>
    </Field>
  );
}

const FieldInput = forwardRef(_FieldInput);

// exports

export { Field, FieldInput, fieldStyles, fieldInputStyles };
export type { FieldBaseProps, FieldInputBaseProps };
