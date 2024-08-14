"use client";

import { cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode, useEffect, useMemo, useState } from "react";
import { FieldError, Group, Label, Text } from "react-aria-components";
import { ValidationResult } from "@react-types/shared";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants, smallRadiusVariants } from "./styles";
import { RadiusProps, SizeProps } from "./types";
import { useObserveElementWidth } from "./utils";

// styles

export const fieldStyles = tv({
  slots: {
    base: "flex flex-col relative size-full",
    labelStyles: "",
    descriptionStyles: "",
    errorMessageStyles: "text-error-500",
  },
  variants: {
    size: {
      sm: { base: "gap-y-0.5", labelStyles: "text-xs", descriptionStyles: "text-xs", errorMessageStyles: "text-xs" },
      md: { base: "gap-y-1", labelStyles: "text-sm", descriptionStyles: "text-sm", errorMessageStyles: "text-sm" },
      lg: { base: "gap-y-1.5", labelStyles: "text-base", descriptionStyles: "text-base", errorMessageStyles: "text-base" },
    },
  },
});

export const fieldInputStyles = tv({
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
      sm: { base: radiusVariants.radius.sm, button: smallRadiusVariants.radius.sm },
      md: { base: radiusVariants.radius.md, button: smallRadiusVariants.radius.md },
      lg: { base: radiusVariants.radius.lg, button: smallRadiusVariants.radius.lg },
      full: { base: radiusVariants.radius.full, button: smallRadiusVariants.radius.full },
      none: { base: radiusVariants.radius.none, button: smallRadiusVariants.radius.none },
    },
    isTextArea: { true: "h-auto items-start" },
    isInvalid: { true: "border-error-500 border-opacity-50" },
    isHovered: { true: "bg-default-50" },
    isFocusWithin: { true: "border-opacity-100" },
    ...isFocusVisibleVariants,
    ...isDisabledVariants,
  },
});

// props

interface FieldBaseProps extends SizeProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validationResult: ValidationResult) => ReactNode);
  labelNecessityIndicator?: "symbol" | "text";
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
  const { label, description, errorMessage, isRequired, isInvalid, labelNecessityIndicator = "symbol", size = "md", children } = props;

  const styleSlots = fieldStyles({ size });

  return (
    <div ref={ref} className={styleSlots.base()}>
      {label && (
        <Label className={styleSlots.labelStyles()}>
          {label}
          {labelNecessityIndicator === "symbol" && isRequired && <span> *</span>}
          {labelNecessityIndicator === "text" && <span> {isRequired ? "(required)" : "(optional)"}</span>}
        </Label>
      )}

      {children}

      {description && (
        <Text slot="description" className={styleSlots.descriptionStyles()}>
          {description}
        </Text>
      )}

      <FieldError className={styleSlots.errorMessageStyles()}>{errorMessage}</FieldError>
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
        styleSlots.base({ isHovered, isInvalid, isDisabled, isFocusVisible, isFocusWithin: isFocusWithin || isFocusWithinProps })
      }
      style={{
        paddingTop: isTextArea ? spacingSize : undefined,
        paddingBottom: isTextArea ? spacingSize : undefined,
        paddingLeft: !isMounted ? spacingSize : undefined,
        paddingRight: !isMounted ? spacingSize : undefined,
        gap: !isMounted ? spacingSize : undefined,
      }}
    >
      {startButton &&
        cloneElement(startButton, {
          ref: startButtonRef,
          style: isMounted ? { position: "absolute", left: spacingSize, ...startButton.props?.style } : {},
          className: styleSlots.button({ className: startButton.props?.className }),
        })}

      {startContent &&
        cloneElement(startContent, {
          ref: startContentRef,
          style: isMounted
            ? { position: "absolute", left: hasStartButton ? spacingSize * 2 + startButtonWidth : spacingSize, ...startContent.props?.style }
            : {},
          className: styleSlots.content({ className: startContent.props?.className }),
        })}

      {children &&
        cloneElement(children, {
          style: isMounted ? { paddingLeft, paddingRight, ...children.props?.style } : {},
          className: styleSlots.self({ className: children.props?.className }),
        })}

      {endContent &&
        cloneElement(endContent, {
          ref: endContentRef,
          style: isMounted
            ? { position: "absolute", right: hasEndButton ? spacingSize * 2 + endButtonWidth : spacingSize, ...endContent.props?.style }
            : {},
          className: styleSlots.content({ className: endContent.props?.className }),
        })}

      {endButton &&
        cloneElement(endButton, {
          ref: endButtonRef,
          style: isMounted ? { position: "absolute", right: spacingSize, ...endButton.props?.style } : {},
          className: styleSlots.button({ className: endButton.props?.className }),
        })}
    </Group>
  );
}

const FieldInput = forwardRef(_FieldInput);

// exports

export { Field, FieldInput };
export type { FieldBaseProps, FieldInputBaseProps };
