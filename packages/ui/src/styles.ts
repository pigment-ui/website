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
  base: "relative flex items-center justify-center overflow-hidden border border-transparent backdrop-blur-xl duration-300",
  variants: {
    variant: {
      solid: "text-default-0",
      soft: "bg-opacity-10",
      light: "bg-opacity-0",
      bordered: "border-opacity-50 bg-opacity-10",
      outlined: "border-opacity-50 bg-opacity-0",
      faded: "border-default-300 bg-default-100",
    },
    color: {
      default: "",
      inverted: "text-default-1000",
      primary: "",
      secondary: "",
      info: "",
      success: "",
      warning: "",
      error: "",
    },
    isHovered: { true: "" },
    isPressed: { true: "scale-95" },
    isDisabled: isDisabledVariants,
    isFocusVisible: isFocusVisibleVariants,
  },
  compoundVariants: [
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "default", className: "bg-default-1000" },
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "inverted", className: "bg-default-0" },
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "primary", className: "bg-primary-500" },
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "secondary", className: "bg-secondary-500" },
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "info", className: "bg-info-500" },
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "success", className: "bg-success-500" },
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "warning", className: "bg-warning-500" },
    { variant: ["solid", "soft", "light", "bordered", "outlined"], color: "error", className: "bg-error-500" },

    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "default", className: "text-default-1000" },
    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "inverted", className: "text-default-0" },
    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "primary", className: "text-primary-500" },
    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "secondary", className: "text-secondary-500" },
    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "info", className: "text-info-500" },
    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "success", className: "text-success-500" },
    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "warning", className: "text-warning-500" },
    { variant: ["soft", "light", "bordered", "outlined", "faded"], color: "error", className: "text-error-500" },

    { variant: ["bordered", "outlined"], color: "default", className: "border-default-1000" },
    { variant: ["bordered", "outlined"], color: "inverted", className: "border-default-0" },
    { variant: ["bordered", "outlined"], color: "primary", className: "border-primary-500" },
    { variant: ["bordered", "outlined"], color: "secondary", className: "border-secondary-500" },
    { variant: ["bordered", "outlined"], color: "info", className: "border-info-500" },
    { variant: ["bordered", "outlined"], color: "success", className: "border-success-500" },
    { variant: ["bordered", "outlined"], color: "warning", className: "border-warning-500" },
    { variant: ["bordered", "outlined"], color: "error", className: "border-error-500" },

    { isHovered: true, variant: "solid", className: "bg-opacity-90" },
    { isHovered: true, variant: "soft", className: "bg-opacity-20" },
    { isHovered: true, variant: "light", className: "bg-opacity-10" },
    { isHovered: true, variant: "bordered", className: "bg-opacity-20" },
    { isHovered: true, variant: "outlined", className: "bg-opacity-10" },
    { isHovered: true, variant: "faded", className: "bg-default-200" },

    { color: "inverted", variant: "faded", className: "border border-default-700 bg-default-900" },
    { color: "inverted", variant: "faded", isHovered: true, className: "bg-default-800" },
    { color: "inverted", isFocusVisible: true, className: "outline-default-0" },
  ],
});

export const segmentStyles = tv({
  base: ["text-default-1000 outline-none [caret-color:transparent;]"],
  variants: {
    size: { sm: "px-1 py-0.5", md: "px-1.5 py-1", lg: "px-2 py-1.5" },
    isPlaceholder: { true: "text-default-500" },
    isFocused: { true: "bg-default-1000 text-default-0" },
    radius: smallRadiusVariants,
  },
  defaultVariants: { size: "md", radius: "md" },
});
