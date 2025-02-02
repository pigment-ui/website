"use client";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants } from "./styles";
import { RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";
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
    errorMessage: "text-error-500",
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
  slots: {
    base: "flex cursor-text items-center overflow-hidden border border-default-1000 border-opacity-20 bg-default-0 duration-300 data-[disabled]:bg-default-1000/10",
    self: "flex size-full flex-1 items-center bg-transparent text-default-1000 outline-none placeholder:text-default-500 data-[disabled]:pointer-events-none [&[aria-disabled]]:pointer-events-none",
    content: "pointer-events-none shrink-0 text-default-700",
    button: [
      "flex items-center rounded-[inherit] bg-default-1000 bg-opacity-10 px-1.5 text-default-700 outline-none duration-300",
      "data-[pressed]:scale-90 data-[hovered]:bg-opacity-20",
      "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50",
      "data-[focus-visible]:z-10 data-[focus-visible]:outline data-[focus-visible]:outline-default-1000",
    ],
  },
  variants: {
    size: {
      sm: { base: "h-8 gap-2 px-2 text-xs [&_svg]:size-4", button: "h-6 [&_svg]:!size-3" },
      md: { base: "h-10 gap-2.5 px-2.5 text-sm [&_svg]:size-5", button: "h-7 [&_svg]:!size-4" },
      lg: { base: "h-12 gap-3 px-3 text-base [&_svg]:size-6", button: "h-8 [&_svg]:!size-5" },
    },
    isTextArea: { true: "h-auto items-start" },
    isHovered: { true: "bg-default-50" },
    isFocusWithin: { true: "border-opacity-100" },
    isInvalid: { true: "border-error-500 border-opacity-50" },
    isFocusVisible: isFocusVisibleVariants,
    isDisabled: isDisabledVariants,
    radius: radiusVariants,
  },
  compoundVariants: [
    { isTextArea: true, size: "sm", className: "py-2" },
    { isTextArea: true, size: "md", className: "py-2.5" },
    { isTextArea: true, size: "lg", className: "py-3" },
  ],
});

type FieldInputStylesReturnType = ReturnType<typeof fieldInputStyles>;

// props

interface FieldBaseProps extends SizeProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validationResult: ValidationResult) => ReactNode);
  fieldClassNames?: StyleSlotsToStyleProps<FieldStylesReturnType>["classNames"];
  fieldStyles?: StyleSlotsToStyleProps<FieldStylesReturnType>["styles"];
}

interface FieldProps extends FieldBaseProps {
  isRequired?: boolean;
  children?: ReactNode;
}

interface FieldInputBaseProps extends SizeProps, RadiusProps {
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
    size = "md",
    radius = size,
    isInvalid,
    isDisabled,
    isTextArea = false,
    isFocusWithin: isFocusWithinProps,
    startContent,
    endContent,
    startButton,
    endButton,
    children,
    fieldInputClassNames,
    fieldInputStyles: fieldInputStylesFromProps,
  } = props;

  const styleSlots = fieldInputStyles({ size, radius, isTextArea });

  // @ts-ignore
  const selfRef = useObjectRef<HTMLElement>(children?.ref);

  return (
    <Group
      ref={ref}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      className={({ isHovered, isInvalid, isDisabled, isFocusVisible, isFocusWithin }) =>
        styleSlots.base({
          isHovered,
          isInvalid,
          isDisabled,
          isFocusVisible,
          isFocusWithin: isFocusWithin || isFocusWithinProps,
          className: fieldInputClassNames?.base,
        })
      }
      style={fieldInputStylesFromProps?.base}
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
  );
}

const FieldInput = forwardRef(_FieldInput);

// exports

export { Field, FieldInput, fieldStyles, fieldInputStyles };
export type { FieldBaseProps, FieldInputBaseProps };
