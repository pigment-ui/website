"use client";

import { ValidationResult } from "@react-types/shared";
import { cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode, useLayoutEffect, useState } from "react";
import { FieldError, Group, Label, Text } from "react-aria-components";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants, smallRadiusVariants } from "./styles";
import { ContentProps, RadiusProps, SizeProps } from "./types";
import { useObserveElementWidth } from "./utils";

// styles

export const fieldStyles = tv({
  slots: {
    base: "flex flex-col",
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
    base: "relative flex items-center bg-default-0 border border-default-1000 border-opacity-20 overflow-hidden",
    self: "flex-1 h-full bg-transparent outline-none placeholder:text-default-500 flex items-center [&[aria-disabled]]:pointer-events-none",
    content: "flex items-center text-neutral-700",
    button:
      "grid place-items-center bg-default-1000 bg-opacity-10 data-[hovered]:bg-opacity-20 data-[pressed]:scale-90 data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed",
  },
  variants: {
    size: {
      sm: { base: "h-8 text-xs", content: "[&_svg]:size-4", button: "h-6 w-6 [&_svg]:size-3" },
      md: { base: "h-10 text-sm", content: "[&_svg]:size-5", button: "h-7 w-7 [&_svg]:size-4" },
      lg: { base: "h-12 text-base", content: "[&_svg]:size-6", button: "h-8 w-8 [&_svg]:size-5" },
    },
    radius: {
      sm: { base: radiusVariants.radius.sm, button: smallRadiusVariants.radius.sm },
      md: { base: radiusVariants.radius.md, button: smallRadiusVariants.radius.md },
      lg: { base: radiusVariants.radius.lg, button: smallRadiusVariants.radius.lg },
      full: { base: radiusVariants.radius.full, button: smallRadiusVariants.radius.full },
      none: { base: radiusVariants.radius.none, button: smallRadiusVariants.radius.none },
    },
    isTextArea: { true: "h-auto items-start" },
    isInvalid: { true: { base: "border-error-500 border-opacity-50", self: "bg-red-500" } },
    isHovered: { true: "bg-default-50" },
    isFocusWithin: { true: "border-opacity-100" },
    ...isFocusVisibleVariants,
    ...isDisabledVariants,
  },
  compoundVariants: [
    { isTextArea: true, size: "sm", className: { base: "py-2" } },
    { isTextArea: true, size: "md", className: { base: "py-2.5" } },
    { isTextArea: true, size: "lg", className: { base: "py-3" } },
  ],
});

// props

interface PigmentFieldBaseProps extends SizeProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode | ((validationResult: ValidationResult) => ReactNode);
  labelNecessityIndicator?: "symbol" | "text";
}

interface PigmentFieldProps extends PigmentFieldBaseProps {
  isInvalid?: boolean;
  isRequired?: boolean;
  children?: ReactElement;
}

interface PigmentFieldInputBaseProps extends SizeProps, RadiusProps, ContentProps {}

interface PigmentFieldInputProps extends PigmentFieldInputBaseProps {
  isTextArea?: boolean;
  isInvalid?: boolean;
  isDisabled?: boolean;
  children?: ReactElement;
  startButton?: ReactElement;
  endButton?: ReactElement;
}

// component

function _Field(props: PigmentFieldProps, ref: ForwardedRef<HTMLDivElement>) {
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

function _FieldInput(props: PigmentFieldInputProps, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", radius = "md", isInvalid, isDisabled, isTextArea = false, startContent, endContent, startButton, endButton, children } = props;

  const styleSlots = fieldInputStyles({ size, radius, isTextArea });

  const hasStartButton = !!startButton;
  const hasEndButton = !!endButton;
  const spacingSize = { sm: 8, md: 10, lg: 12 }[size];

  const [mounted, setMounted] = useState<boolean>(false);
  const [paddingLeft, setPaddingLeft] = useState<number>(spacingSize);
  const [paddingRight, setPaddingRight] = useState<number>(spacingSize);

  const { width: startButtonWidth, ref: startButtonRef } = useObserveElementWidth<HTMLButtonElement>();
  const { width: startContentWidth, ref: startContentRef } = useObserveElementWidth<HTMLDivElement>();
  const { width: endButtonWidth, ref: endButtonRef } = useObserveElementWidth<HTMLButtonElement>();
  const { width: endContentWidth, ref: endContentRef } = useObserveElementWidth<HTMLDivElement>();

  useLayoutEffect(() => {
    setPaddingLeft((startButtonWidth ? startButtonWidth + spacingSize : 0) + (startContentWidth ? startContentWidth + spacingSize : 0) + spacingSize);
    setPaddingRight((endButtonWidth ? endButtonWidth + spacingSize : 0) + (endContentWidth ? endContentWidth + spacingSize : 0) + spacingSize);
    setMounted(true);
  }, [startButtonWidth, startContentWidth, endButtonWidth, endContentWidth, spacingSize]);

  return (
    <Group
      ref={ref}
      isInvalid={isInvalid}
      isDisabled={isDisabled}
      className={({ isHovered, isInvalid, isDisabled, isFocusVisible, isFocusWithin }) =>
        styleSlots.base({ isHovered, isInvalid, isDisabled, isFocusVisible, isFocusWithin })
      }
    >
      {startButton &&
        cloneElement(startButton, {
          ref: startButtonRef,
          style: mounted ? { position: "absolute", left: spacingSize } : { marginLeft: spacingSize },
          className: styleSlots.button({ className: startButton.props?.className }),
        })}

      {startContent && (
        <div
          ref={startContentRef}
          style={mounted ? { position: "absolute", left: hasStartButton ? spacingSize * 5 : spacingSize } : { marginLeft: spacingSize }}
          className={styleSlots.content()}
        >
          {startContent}
        </div>
      )}

      {children &&
        cloneElement(children, {
          style: { paddingLeft, paddingRight, ...children.props?.style },
          className: styleSlots.self({ className: children.props?.className }),
        })}

      {endContent && (
        <div
          ref={endContentRef}
          style={mounted ? { position: "absolute", right: hasEndButton ? spacingSize * 5 : spacingSize } : { marginRight: spacingSize }}
          className={styleSlots.content()}
        >
          {endContent}
        </div>
      )}

      {endButton &&
        cloneElement(endButton, {
          ref: endButtonRef,
          style: mounted ? { position: "absolute", right: spacingSize } : { marginRight: spacingSize },
          className: styleSlots.button({ className: endButton.props?.className }),
        })}
    </Group>
  );
}

const FieldInput = forwardRef(_FieldInput);

// exports

export { Field, FieldInput };
export type { PigmentFieldBaseProps, PigmentFieldProps, PigmentFieldInputBaseProps, PigmentFieldInputProps };
