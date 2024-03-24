import { Colors, Variants } from "./types";

export const isPressedVariants = {
  isPressed: {
    true: "scale-95",
  },
};

export const isDisabledVariants = {
  isDisabled: {
    true: "opacity-50 cursor-not-allowed",
  },
};

export const isFocusVisibleVariants = {
  isFocusVisible: {
    true: "outline outline-2 outline-offset-2 outline-default-1000 z-10",
    false: "outline-none",
  },
};

export const variantAndColorVariants: { variant: Record<Variants, string>; color: Record<Colors, string> } = {
  variant: {
    solid: "text-default-0",
    soft: "bg-opacity-10",
    light: "bg-opacity-0",
    bordered: "bg-opacity-0 border border-opacity-50",
    faded: "bg-default-100 border border-default-300",
  },
  color: {
    default: "",
    info: "",
    success: "",
    warning: "",
    error: "",
  },
};

export const radiusVariants = {
  radius: {
    sm: "rounded-lg",
    md: "rounded-xl",
    lg: "rounded-2xl",
    full: "rounded-full",
    none: "rounded-none",
  },
};

export const variantAndColorCompoundVariants: {
  variant: Variants | Variants[];
  color: Colors | Colors[];
  className: string;
}[] = [
  // solid & soft & light & bordered
  {
    variant: ["solid", "soft", "light", "bordered"],
    color: "default",
    className: "bg-default-1000",
  },
  {
    variant: ["solid", "soft", "light", "bordered"],
    color: "info",
    className: "bg-info-500",
  },
  {
    variant: ["solid", "soft", "light", "bordered"],
    color: "success",
    className: "bg-success-500",
  },
  {
    variant: ["solid", "soft", "light", "bordered"],
    color: "warning",
    className: "bg-warning-500",
  },
  {
    variant: ["solid", "soft", "light", "bordered"],
    color: "error",
    className: "bg-error-500",
  },
  // soft & light & bordered & faded
  {
    variant: ["soft", "light", "bordered", "faded"],
    color: "default",
    className: "text-default-1000",
  },
  {
    variant: ["soft", "light", "bordered", "faded"],
    color: "info",
    className: "text-info-500",
  },
  {
    variant: ["soft", "light", "bordered", "faded"],
    color: "success",
    className: "text-success-500",
  },
  {
    variant: ["soft", "light", "bordered", "faded"],
    color: "warning",
    className: "text-warning-500",
  },
  {
    variant: ["soft", "light", "bordered", "faded"],
    color: "error",
    className: "text-error-500",
  },
  // bordered
  {
    variant: ["bordered"],
    color: "default",
    className: "border-default-1000",
  },
  {
    variant: ["bordered"],
    color: "info",
    className: "border-info-500",
  },
  {
    variant: ["bordered"],
    color: "success",
    className: "border-success-500",
  },
  {
    variant: ["bordered"],
    color: "warning",
    className: "border-warning-500",
  },
  {
    variant: ["bordered"],
    color: "error",
    className: "border-error-500",
  },
];
