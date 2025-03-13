import { useGlobalSlots } from "./provider";
import { tv } from "tailwind-variants";

export const isDisabledVariants = { true: "opacity-50 cursor-not-allowed" } as const;

export const isFocusVisibleVariants = { true: "outline-2 outline-offset-2 outline-focus" } as const;

export const radiusVariants = { sm: "rounded-lg", md: "rounded-xl", lg: "rounded-2xl", full: "rounded-full", none: "rounded-none" } as const;

export const smallRadiusVariants = { sm: "rounded-md", md: "rounded-lg", lg: "rounded-xl", full: "rounded-full", none: "rounded-none" } as const;

export const useVariantAndColorStyles = () => {
  const { extendVariantAndColorStyles = {} } = useGlobalSlots();

  return tv({
    extend: extendVariantAndColorStyles,
    base: "relative flex items-center justify-center overflow-hidden border bg-clip-padding outline-none backdrop-blur-lg duration-300",
    variants: {
      variant: {
        solid: "",
        soft: "",
        light: "",
        bordered: "",
        outlined: "",
        ghost: "",
        faded: "",
        card: "",
      },
      color: {
        default: "",
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
      { variant: "solid", className: "border-transparent" },
      { variant: "solid", isHovered: true, className: "bg-opacity-90" },
      { variant: "solid", color: "default", className: "bg-default text-default-foreground" },
      { variant: "solid", color: "primary", className: "bg-primary text-primary-foreground" },
      { variant: "solid", color: "secondary", className: "bg-secondary text-secondary-foreground" },
      { variant: "solid", color: "info", className: "bg-info text-info-foreground" },
      { variant: "solid", color: "success", className: "bg-success text-success-foreground" },
      { variant: "solid", color: "warning", className: "bg-warning text-warning-foreground" },
      { variant: "solid", color: "error", className: "bg-error text-error-foreground" },

      { variant: "soft", className: "border-transparent bg-opacity-10" },
      { variant: "soft", isHovered: true, className: "bg-opacity-20" },
      { variant: "soft", color: "default", className: "bg-default text-default" },
      { variant: "soft", color: "primary", className: "bg-primary text-primary" },
      { variant: "soft", color: "secondary", className: "bg-secondary text-secondary" },
      { variant: "soft", color: "info", className: "bg-info text-info" },
      { variant: "soft", color: "success", className: "bg-success text-success" },
      { variant: "soft", color: "warning", className: "bg-warning text-warning" },
      { variant: "soft", color: "error", className: "bg-error text-error" },

      { variant: "light", className: "border-transparent bg-opacity-0" },
      { variant: "light", isHovered: true, className: "bg-opacity-10" },
      { variant: "light", color: "default", className: "bg-default text-default" },
      { variant: "light", color: "primary", className: "bg-primary text-primary" },
      { variant: "light", color: "secondary", className: "bg-secondary text-secondary" },
      { variant: "light", color: "info", className: "bg-info text-info" },
      { variant: "light", color: "success", className: "bg-success text-success" },
      { variant: "light", color: "warning", className: "bg-warning text-warning" },
      { variant: "light", color: "error", className: "bg-error text-error" },

      { variant: "bordered", className: "border-opacity-50 bg-opacity-10" },
      { variant: "bordered", isHovered: true, className: "bg-opacity-20" },
      { variant: "bordered", color: "default", className: "border-default bg-default text-default" },
      { variant: "bordered", color: "primary", className: "border-primary bg-primary text-primary" },
      { variant: "bordered", color: "secondary", className: "border-secondary bg-secondary text-secondary" },
      { variant: "bordered", color: "info", className: "border-info bg-info text-info" },
      { variant: "bordered", color: "success", className: "border-success bg-success text-success" },
      { variant: "bordered", color: "warning", className: "border-warning bg-warning text-warning" },
      { variant: "bordered", color: "error", className: "border-error bg-error text-error" },

      { variant: "outlined", className: "border-opacity-50 bg-opacity-0" },
      { variant: "outlined", isHovered: true, className: "bg-opacity-10" },
      { variant: "outlined", color: "default", className: "border-default bg-default text-default" },
      { variant: "outlined", color: "primary", className: "border-primary bg-primary text-primary" },
      { variant: "outlined", color: "secondary", className: "border-secondary bg-secondary text-secondary" },
      { variant: "outlined", color: "info", className: "border-info bg-info text-info" },
      { variant: "outlined", color: "success", className: "border-success bg-success text-success" },
      { variant: "outlined", color: "warning", className: "border-warning bg-warning text-warning" },
      { variant: "outlined", color: "error", className: "border-error bg-error text-error" },

      { variant: "ghost", className: "border-opacity-50 bg-opacity-0" },
      { variant: "ghost", isHovered: true, className: "border-transparent bg-opacity-100" },
      { variant: "ghost", color: "default", className: "border-default bg-default text-default" },
      { variant: "ghost", color: "default", isHovered: true, className: "text-default-foreground" },
      { variant: "ghost", color: "primary", className: "border-primary bg-primary text-primary" },
      { variant: "ghost", color: "primary", isHovered: true, className: "text-primary-foreground" },
      { variant: "ghost", color: "secondary", className: "border-secondary bg-secondary text-secondary" },
      { variant: "ghost", color: "secondary", isHovered: true, className: "text-secondary-foreground" },
      { variant: "ghost", color: "info", className: "border-info bg-info text-info" },
      { variant: "ghost", color: "info", isHovered: true, className: "text-info-foreground" },
      { variant: "ghost", color: "success", className: "border-success bg-success text-success" },
      { variant: "ghost", color: "success", isHovered: true, className: "text-success-foreground" },
      { variant: "ghost", color: "warning", className: "border-warning bg-warning text-warning" },
      { variant: "ghost", color: "warning", isHovered: true, className: "text-warning-foreground" },
      { variant: "ghost", color: "error", className: "border-error bg-error text-error" },
      { variant: "ghost", color: "error", isHovered: true, className: "text-error-foreground" },

      { variant: "faded", className: "border-default-300 bg-default-100" },
      { variant: "faded", isHovered: true, className: "bg-default-200" },
      { variant: "faded", color: "default", className: "text-default" },
      { variant: "faded", color: "primary", className: "text-primary" },
      { variant: "faded", color: "secondary", className: "text-secondary" },
      { variant: "faded", color: "info", className: "text-info" },
      { variant: "faded", color: "success", className: "text-success" },
      { variant: "faded", color: "warning", className: "text-warning" },
      { variant: "faded", color: "error", className: "text-error" },

      { variant: "card", className: "border-default-1000/20 bg-default-0" },
      { variant: "card", isHovered: true, className: "bg-default-100" },
      { variant: "card", color: "default", className: "text-default" },
      { variant: "card", color: "primary", className: "text-primary" },
      { variant: "card", color: "secondary", className: "text-secondary" },
      { variant: "card", color: "info", className: "text-info" },
      { variant: "card", color: "success", className: "text-success" },
      { variant: "card", color: "warning", className: "text-warning" },
      { variant: "card", color: "error", className: "text-error" },
    ],
  });
};
