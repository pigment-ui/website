import { cloneElement, ForwardedRef, forwardRef, ReactElement, ReactNode } from "react";
import { FieldError, Group, Label, Text } from "react-aria-components";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants } from "./styles";
import { ChildrenProps, ContentProps, RadiusProps, SizeProps } from "./types";

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
    base: "flex items-center bg-default-100 overflow-hidden outline-none",
    self: "flex-1 h-full bg-transparent outline-none placeholder:text-default-500",
    content: "text-default-700",
    button: "grid place-items-center bg-default-1000 bg-opacity-10 data-[hovered]:bg-opacity-20 data-[pressed]:scale-95",
  },
  variants: {
    ...isDisabledVariants,
    ...isFocusVisibleVariants,
    size: {
      sm: { base: "h-8 gap-x-2 text-xs", content: "[&>svg]:h-4 [&>svg]:w-4", button: "h-6 w-6 [&>svg]:h-3 [&>svg]:w-3" },
      md: { base: "h-10 gap-x-3 text-sm", content: "[&>svg]:h-5 [&>svg]:w-5", button: "h-7 w-7 [&>svg]:h-4 [&>svg]:w-4" },
      lg: { base: "h-12 gap-x-4 text-base", content: "[&>svg]:h-6 [&>svg]:w-6", button: "h-8 w-8 [&>svg]:h-5 [&>svg]:w-5" },
    },
    radius: {
      sm: { base: radiusVariants.radius.sm, button: radiusVariants.radius.sm },
      md: { base: radiusVariants.radius.md, button: radiusVariants.radius.md },
      lg: { base: radiusVariants.radius.lg, button: radiusVariants.radius.lg },
      full: { base: radiusVariants.radius.full, button: radiusVariants.radius.full },
      none: { base: radiusVariants.radius.none, button: radiusVariants.radius.none },
    },
    isInvalid: { true: "bg-error-100" },
    isHovered: { true: "bg-default-200" },
    isFocusWithin: { true: "bg-default-300" },
    hasStartButton: { true: "" },
    hasEndButton: { true: "" },
  },
  compoundVariants: [
    { isInvalid: true, isHovered: true, className: { base: "bg-error-200" } },
    { isInvalid: true, isFocusWithin: true, className: { base: "bg-error-300" } },
    { size: "sm", hasStartButton: true, className: { base: "pl-1" } },
    { size: "md", hasStartButton: true, className: { base: "pl-1.5" } },
    { size: "lg", hasStartButton: true, className: { base: "pl-2" } },
    { size: "sm", hasEndButton: true, className: { base: "pr-1" } },
    { size: "md", hasEndButton: true, className: { base: "pr-1.5" } },
    { size: "lg", hasEndButton: true, className: { base: "pr-2" } },
    { size: "sm", hasStartButton: false, className: { base: "pl-2" } },
    { size: "md", hasStartButton: false, className: { base: "pl-3" } },
    { size: "lg", hasStartButton: false, className: { base: "pl-4" } },
    { size: "sm", hasEndButton: false, className: { base: "pr-2" } },
    { size: "md", hasEndButton: false, className: { base: "pr-3" } },
    { size: "lg", hasEndButton: false, className: { base: "pr-4" } },
  ],
});

// props

interface PigmentFieldBaseProps extends SizeProps {
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  isRequired?: boolean;
  labelNecessityIndicator?: "symbol" | "text";
}

interface PigmentFieldProps extends PigmentFieldBaseProps, ChildrenProps {}

interface PigmentFieldInputBaseProps extends SizeProps, RadiusProps, ContentProps {}

interface PigmentFieldInputProps extends PigmentFieldInputBaseProps, ChildrenProps {
  isInvalid?: boolean;
  isDisabled?: boolean;
  startButton?: ReactNode;
  endButton?: ReactNode;
}

// component

function _Field(props: PigmentFieldProps, ref: ForwardedRef<HTMLDivElement>) {
  const { label, description, errorMessage, size = "md", isRequired, labelNecessityIndicator = "symbol", children } = props;

  const stylesSlots = fieldStyles({ size });

  return (
    <div ref={ref} className={stylesSlots.base()}>
      {label && (
        <Label className={stylesSlots.labelStyles()}>
          {label}
          {labelNecessityIndicator === "symbol" && isRequired && <span> *</span>}
          {labelNecessityIndicator === "text" && <span> {isRequired ? "(required)" : "(optional)"}</span>}
        </Label>
      )}

      {children}

      {errorMessage ? (
        <FieldError className={stylesSlots.errorMessageStyles()}>{errorMessage}</FieldError>
      ) : description ? (
        <Text slot="description" className={stylesSlots.descriptionStyles()}>
          {description}
        </Text>
      ) : null}
    </div>
  );
}

const Field = forwardRef(_Field);

function _FieldInput(props: PigmentFieldInputProps, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", radius = "md", isInvalid, isDisabled, startContent, endContent, startButton, endButton, children } = props;

  const stylesSlots = fieldInputStyles({ size, radius, hasStartButton: !!startButton, hasEndButton: !!endButton });

  return (
    <Group
      ref={ref}
      className={({ isHovered, isFocusVisible, isFocusWithin }) =>
        stylesSlots.base({ isInvalid, isHovered, isDisabled, isFocusVisible, isFocusWithin })
      }
    >
      {startButton && cloneElement(startButton as ReactElement, { className: stylesSlots.button() })}
      {startContent && <div className={stylesSlots.content()}>{startContent}</div>}
      {children && cloneElement(children as ReactElement, { className: stylesSlots.self() })}
      {endContent && <div className={stylesSlots.content()}>{endContent}</div>}
      {endButton && cloneElement(endButton as ReactElement, { className: stylesSlots.button() })}
    </Group>
  );
}

const FieldInput = forwardRef(_FieldInput);

// exports

export { Field, FieldInput };
export type { PigmentFieldBaseProps, PigmentFieldProps, PigmentFieldInputBaseProps, PigmentFieldInputProps };
