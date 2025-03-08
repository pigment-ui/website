import { tv } from "tailwind-variants";

export const isDisabledVariants = {
  true: "opacity-50 cursor-not-allowed",
} as const;

export const isFocusVisibleVariants = {
  true: "outline outline-2 outline-offset-2 outline-default-1000 z-10",
  false: "outline-none",
} as const;

export const radiusVariants = {
  sm: "rounded-lg",
  md: "rounded-xl",
  lg: "rounded-2xl",
  full: "rounded-full",
  none: "rounded-none",
} as const;

export const smallRadiusVariants = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  full: "rounded-full",
  none: "rounded-none",
} as const;

export const variantColorStyles = tv({
  base: "relative flex items-center justify-center overflow-hidden border backdrop-blur-lg duration-300",
  variants: {
    variant: {
      solid: "",
      soft: "bg-opacity-10",
      light: "bg-opacity-0",
      bordered: "border-opacity-50 bg-opacity-10",
      outlined: "border-opacity-50 bg-opacity-0",
      faded: "",
    },
    color: {
      default: "border-default-1000 bg-default-1000 text-default-1000",
      inverted: "border-default-0 bg-default-0 text-default-0",
      primary: "bg-primary text-primary border-primary",
      secondary: "bg-secondary text-secondary border-secondary",
      info: "bg-info text-info border-info",
      success: "bg-success text-success border-success",
      warning: "bg-warning text-warning border-warning",
      error: "bg-error text-error border-error",
    },
    isHovered: { true: "" },
    isPressed: { true: "scale-95" },
    isDisabled: isDisabledVariants,
    isFocusVisible: isFocusVisibleVariants,
  },
  compoundVariants: [
    { variant: "solid", color: "default", className: "text-default-0" },
    { variant: "solid", color: "inverted", className: "text-default-1000" },
    { variant: "solid", color: "primary", className: "text-primary-foreground" },
    { variant: "solid", color: "secondary", className: "text-secondary-foreground" },
    { variant: "solid", color: "info", className: "text-info-foreground" },
    { variant: "solid", color: "success", className: "text-success-foreground" },
    { variant: "solid", color: "warning", className: "text-warning-foreground" },
    { variant: "solid", color: "error", className: "text-error-foreground" },

    { variant: ["solid", "soft", "light"], className: "border-transparent" },

    { isHovered: true, variant: "solid", className: "bg-opacity-90" },
    { isHovered: true, variant: ["soft", "bordered"], className: "bg-opacity-20" },
    { isHovered: true, variant: ["light", "outlined"], className: "bg-opacity-10" },

    { variant: "faded", className: "border-default-300 bg-default-100" },
    { variant: "faded", isHovered: true, className: "bg-default-200" },
    { variant: "faded", color: "inverted", className: "border-default-700 bg-default-900" },
    { variant: "faded", color: "inverted", isHovered: true, className: "bg-default-800" },

    { color: "inverted", isFocusVisible: true, className: "outline-default-0" },
  ],
});

export const segmentStyles = tv({
  base: ["bg-opacity-0 outline-none [caret-color:transparent;]"],
  variants: {
    color: {
      default: "bg-default-1000",
      primary: "bg-primary",
      secondary: "bg-secondary",
      info: "bg-info",
      success: "bg-success",
      warning: "bg-warning",
      error: "bg-error",
    },
    variant: {
      solid: "bg-default-0",
      soft: "",
      light: "",
      bordered: "",
      outlined: "",
      faded: "",
    },
    isPlaceholder: { true: "text-inherit opacity-50" },
    isFocused: { true: "bg-opacity-20" },
    size: { sm: "px-1 py-0.5", md: "px-1.5 py-1", lg: "px-2 py-1.5" },
    radius: smallRadiusVariants,
  },
  defaultVariants: { size: "md", radius: "md", color: "default", variant: "soft" },
});
