"use client";

import { cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode, useEffect, useRef, useState } from "react";
import { FieldError, Group, Label, Text } from "react-aria-components";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants } from "./styles";
import { ContentProps, RadiusProps, SizeProps, StyleProps } from "./types";

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
    self: "flex-1 h-full bg-transparent outline-none placeholder:text-default-500",
    content: "text-default-700 pointer-events-none",
    button: "grid place-items-center bg-default-1000 bg-opacity-10 data-[hovered]:bg-opacity-20 data-[pressed]:scale-95 outline-none",
  },
  variants: {
    size: {
      sm: { base: "h-8 text-xs", content: "[&_svg]:size-4", button: "h-6 w-6 [&_svg]:size-3" },
      md: { base: "h-10 text-sm", content: "[&_svg]:size-5", button: "h-7 w-7 [&_svg]:size-4" },
      lg: { base: "h-12 text-base", content: "[&_svg]:size-6", button: "h-8 w-8 [&_svg]:size-5" },
    },
    radius: {
      sm: { base: radiusVariants.radius.sm, button: radiusVariants.radius.sm },
      md: { base: radiusVariants.radius.md, button: radiusVariants.radius.md },
      lg: { base: radiusVariants.radius.lg, button: radiusVariants.radius.lg },
      full: { base: radiusVariants.radius.full, button: radiusVariants.radius.full },
      none: { base: radiusVariants.radius.none, button: radiusVariants.radius.none },
    },
    hasStartButton: { true: "" },
    hasEndButton: { true: "" },
    isInvalid: { true: "border-error-500 border-opacity-50" },
    isHovered: { true: "bg-default-50" },
    isFocusWithin: { true: "border-opacity-100" },
    ...isFocusVisibleVariants,
    ...isDisabledVariants,
  },
});

// props

interface PigmentFieldBaseProps extends SizeProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  isRequired?: boolean;
  labelNecessityIndicator?: "symbol" | "text";
}

interface PigmentFieldProps extends PigmentFieldBaseProps, StyleProps {
  children?: ReactElement;
}

interface PigmentFieldInputBaseProps extends SizeProps, RadiusProps, ContentProps {}

interface PigmentFieldInputProps extends PigmentFieldInputBaseProps {
  children?: ReactElement;
  isInvalid?: boolean;
  isDisabled?: boolean;
  startButton?: ReactElement;
  endButton?: ReactElement;
}

// component

function _Field(props: PigmentFieldProps, ref: ForwardedRef<HTMLDivElement>) {
  const { label, description, errorMessage, size = "md", isRequired, labelNecessityIndicator = "symbol", children, className, style } = props;

  const styleSlots = fieldStyles({ size });

  return (
    <div ref={ref} className={styleSlots.base({ className })} style={style}>
      {label && (
        <Label className={styleSlots.labelStyles()}>
          {label}
          {labelNecessityIndicator === "symbol" && isRequired && <span> *</span>}
          {labelNecessityIndicator === "text" && <span> {isRequired ? "(required)" : "(optional)"}</span>}
        </Label>
      )}

      {children}

      {errorMessage ? (
        <FieldError className={styleSlots.errorMessageStyles()}>{errorMessage}</FieldError>
      ) : description ? (
        <Text slot="description" className={styleSlots.descriptionStyles()}>
          {description}
        </Text>
      ) : null}
    </div>
  );
}

const Field = forwardRef(_Field);

function _FieldInput(props: PigmentFieldInputProps, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", radius = "md", isInvalid, isDisabled, startContent, endContent, startButton, endButton, children } = props;

  const hasStartButton = !!startButton;
  const hasEndButton = !!endButton;
  const styleSlots = fieldInputStyles({ size, radius, hasStartButton, hasEndButton });

  const spacingSize = { sm: 8, md: 10, lg: 12 }[size];
  const [mounted, setMounted] = useState<boolean>(false);
  const [paddingLeft, setPaddingLeft] = useState<number>(spacingSize);
  const [paddingRight, setPaddingRight] = useState<number>(spacingSize);

  const startButtonRef = useRef<HTMLButtonElement>(null);
  const startContentRef = useRef<HTMLDivElement>(null);
  const endButtonRef = useRef<HTMLButtonElement>(null);
  const endContentRef = useRef<HTMLDivElement>(null);
  const startButtonWidth = startButtonRef.current?.offsetWidth ?? 0;
  const startContentWidth = startContentRef.current?.offsetWidth ?? 0;
  const endButtonWidth = endButtonRef.current?.offsetWidth ?? 0;
  const endContentWidth = endContentRef.current?.offsetWidth ?? 0;

  useEffect(() => {
    setPaddingLeft((startButtonWidth ? startButtonWidth + spacingSize : 0) + (startContentWidth ? startContentWidth + spacingSize : 0) + spacingSize);
    setPaddingRight((endButtonWidth ? endButtonWidth + spacingSize : 0) + (endContentWidth ? endContentWidth + spacingSize : 0) + spacingSize);
    setMounted(true);
  }, [startButtonWidth, startContentWidth, endButtonWidth, endContentWidth, spacingSize]);

  return (
    <Group
      ref={ref}
      className={({ isHovered, isFocusVisible, isFocusWithin }) =>
        styleSlots.base({ isInvalid, isHovered, isDisabled, isFocusVisible, isFocusWithin })
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
          style: { paddingLeft, paddingRight },
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
