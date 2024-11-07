"use client";

import { cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import { FieldError, Group, Label, Text } from "react-aria-components";
import { ValidationResult } from "@react-types/shared";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants, smallRadiusVariants } from "./styles";
import { RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import { useObserveElementWidth } from "./utils";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";

// styles

const fieldStyles = tv({
  slots: {
    base: "flex flex-col relative size-full",
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
    base: "relative flex items-center bg-default-0 border border-default-1000 border-opacity-20 overflow-hidden data-[disabled]:bg-default-1000/10 duration-300 transition-colors",
    self: "flex-1 h-full bg-transparent outline-none text-default-1000 placeholder:text-default-500 flex items-center data-[disabled]:pointer-events-none [&[aria-disabled]]:pointer-events-none",
    content: "text-neutral-500",
    button: [
      "flex items-center bg-default-1000 bg-opacity-10 duration-300",
      "data-[hovered]:bg-opacity-20 data-[pressed]:scale-90",
      "data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
      "outline-none data-[focus-visible]:outline data-[focus-visible]:outline-default-1000 data-[focus-visible]:z-10",
    ],
  },
  variants: {
    size: {
      sm: { base: "h-8 text-xs [&_svg]:size-4", button: "h-6 px-1.5 [&_svg]:!size-3" },
      md: { base: "h-10 text-sm [&_svg]:size-5", button: "h-7 px-1.5 [&_svg]:!size-4" },
      lg: { base: "h-12 text-base [&_svg]:size-6", button: "h-8 px-1.5 [&_svg]:!size-5" },
    },
    radius: {
      sm: { base: radiusVariants.sm, button: smallRadiusVariants.sm },
      md: { base: radiusVariants.md, button: smallRadiusVariants.md },
      lg: { base: radiusVariants.lg, button: smallRadiusVariants.lg },
      full: { base: radiusVariants.full, button: smallRadiusVariants.full },
      none: { base: radiusVariants.none, button: smallRadiusVariants.none },
    },
    isTextArea: { true: "h-auto items-start" },
    isInvalid: { true: "border-error-500 border-opacity-50" },
    isHovered: { true: "bg-default-50" },
    isFocusWithin: { true: "border-opacity-100" },
    isFocusVisible: isFocusVisibleVariants,
    isDisabled: isDisabledVariants,
  },
});

type FieldInputStylesReturnType = ReturnType<typeof fieldInputStyles>;

// props

interface FieldBaseProps extends SizeProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validationResult: ValidationResult) => ReactNode);
  labelNecessityIndicator?: "symbol" | "text";
  fieldClassNames?: StyleSlotsToStyleProps<FieldStylesReturnType>["classNames"];
  fieldStyles?: StyleSlotsToStyleProps<FieldStylesReturnType>["styles"];
}

interface FieldProps extends FieldBaseProps {
  isInvalid?: boolean;
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
  startButton?: ReactElement;
  endButton?: ReactElement;
}

// component

function _Field(props: FieldProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    label,
    description,
    errorMessage,
    isRequired,
    isInvalid,
    labelNecessityIndicator = "symbol",
    size = "md",
    children,
    fieldClassNames,
    fieldStyles: fieldStylesFromProps,
  } = props;

  const styleSlots = fieldStyles({ size });

  return (
    <div ref={ref} className={styleSlots.base({ className: fieldClassNames?.base })} style={fieldStylesFromProps?.base}>
      {label && (
        <Label className={styleSlots.label({ className: fieldClassNames?.label })} style={fieldStylesFromProps?.label}>
          {label}
          {labelNecessityIndicator === "symbol" && isRequired && <span> *</span>}
          {labelNecessityIndicator === "text" && <span> {isRequired ? "(required)" : "(optional)"}</span>}
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
    radius = "md",
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

  const hasStartButton = !!startButton;
  const hasEndButton = !!endButton;
  const spacingSize = { sm: 8, md: 10, lg: 12 }[size];

  const [startButtonWidth, startButtonRef] = useObserveElementWidth<HTMLButtonElement>();
  const [startContentWidth, startContentRef] = useObserveElementWidth<HTMLDivElement>();
  const [endButtonWidth, endButtonRef] = useObserveElementWidth<HTMLButtonElement>();
  const [endContentWidth, endContentRef] = useObserveElementWidth<HTMLDivElement>();

  const paddingLeft = useMemo(
    () => (startButtonWidth ? startButtonWidth + spacingSize : 0) + (startContentWidth ? startContentWidth + spacingSize : 0) + spacingSize,
    [startButtonWidth, startContentWidth, spacingSize],
  );

  const paddingRight = useMemo(
    () => (endButtonWidth ? endButtonWidth + spacingSize : 0) + (endContentWidth ? endContentWidth + spacingSize : 0) + spacingSize,
    [endButtonWidth, endContentWidth, spacingSize],
  );

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

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
      style={mergeProps(
        {
          paddingTop: isTextArea ? spacingSize : undefined,
          paddingBottom: isTextArea ? spacingSize : undefined,
          paddingLeft: !isMounted ? spacingSize : undefined,
          paddingRight: !isMounted ? spacingSize : undefined,
          gap: !isMounted ? spacingSize : undefined,
        },
        fieldInputStylesFromProps?.base,
      )}
    >
      {startButton &&
        cloneElement(startButton, {
          ref: startButtonRef,
          className: styleSlots.button({ className: twMerge(startButton.props?.className, fieldInputClassNames?.button) }),
          style: mergeProps(
            isMounted ? { position: "absolute", left: spacingSize, ...startButton.props?.style } : {},
            fieldInputStylesFromProps?.button,
          ),
        })}

      {startContent &&
        cloneElement(startContent, {
          ref: startContentRef,
          className: styleSlots.content({ className: twMerge(startContent.props?.className, fieldInputClassNames?.content) }),
          style: mergeProps(
            isMounted
              ? { position: "absolute", left: hasStartButton ? spacingSize * 2 + startButtonWidth : spacingSize, ...startContent.props?.style }
              : {},
            fieldInputStylesFromProps?.content,
          ),
        })}

      {children &&
        cloneElement(children, {
          className: styleSlots.self({ className: twMerge(children.props?.className, fieldInputClassNames?.self) }),
          style: mergeProps(isMounted ? { paddingLeft, paddingRight, ...children.props?.style } : {}, fieldInputStylesFromProps?.self),
        })}

      {endContent &&
        cloneElement(endContent, {
          ref: endContentRef,
          className: styleSlots.content({ className: twMerge(endContent.props?.className, fieldInputClassNames?.content) }),
          style: mergeProps(
            isMounted
              ? { position: "absolute", right: hasEndButton ? spacingSize * 2 + endButtonWidth : spacingSize, ...endContent.props?.style }
              : {},
            fieldInputStylesFromProps?.content,
          ),
        })}

      {endButton &&
        cloneElement(endButton, {
          ref: endButtonRef,
          className: styleSlots.button({ className: twMerge(endButton.props?.className, fieldInputClassNames?.button) }),
          style: mergeProps(
            isMounted ? { position: "absolute", right: spacingSize, ...endButton.props?.style } : {},
            fieldInputStylesFromProps?.button,
          ),
        })}
    </Group>
  );
}

const FieldInput = forwardRef(_FieldInput);

// exports

export { Field, FieldInput, fieldStyles, fieldInputStyles };
export type { FieldBaseProps, FieldInputBaseProps };
