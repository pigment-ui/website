"use client";

import { Button } from "./button";
import { radiusVariants, variantColorStyles } from "./styles";
import { ColorProps, SizeProps, StyleSlotsToStyleProps, Variants } from "./types";
import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon, XIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const alertStyles = tv({
  extend: variantColorStyles,
  slots: {
    base: ["flex items-start", radiusVariants.md],
    contentWrapper: "flex-1",
    title: "font-bold",
    description: "",
    icon: "",
    closeButton: "-translate-y-1/4 translate-x-1/4",
  },
  variants: {
    size: {
      sm: { base: "gap-3 p-3", title: "text-sm", description: "text-xs", icon: "[&_svg]:size-6" },
      md: { base: "gap-4 p-4", title: "text-base", description: "text-sm", icon: "[&_svg]:size-8" },
      lg: { base: "gap-5 p-5", title: "text-lg", description: "text-base", icon: "[&_svg]:size-10" },
    },
  },
});

type AlertStylesReturnType = ReturnType<typeof alertStyles>;

// props

interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    ColorProps<true>,
    SizeProps,
    StyleSlotsToStyleProps<AlertStylesReturnType> {
  variant?: Exclude<Variants, "soft">;
  title?: string;
  description?: string;
  hideIcon?: boolean;
  onClose?: () => void;
}

// component

function _Alert(props: AlertProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    title,
    description,
    variant = "solid",
    color = "default",
    size = "md",
    hideIcon,
    onClose,
    className,
    classNames,
    style,
    styles,
    children,
    ...restProps
  } = props;

  const styleSlots = alertStyles({ variant, color, size });

  return (
    <div
      ref={ref}
      {...restProps}
      className={styleSlots.base({ className: twMerge(classNames?.base, className) })}
      style={mergeProps(styles?.base, style)}
    >
      {!hideIcon && (
        <div className={styleSlots.icon({ className: classNames?.icon })} style={styles?.icon}>
          {color === "success" ? <CircleCheckIcon /> : color === "warning" ? <CircleAlertIcon /> : color === "error" ? <CircleXIcon /> : <InfoIcon />}
        </div>
      )}
      <div className={styleSlots.contentWrapper({ className: classNames?.contentWrapper })} style={styles?.contentWrapper}>
        {title && (
          <div className={styleSlots.title({ className: classNames?.title })} style={styles?.title}>
            {title}
          </div>
        )}
        {description && (
          <div className={styleSlots.description({ className: classNames?.description })} style={styles?.description}>
            {description}
          </div>
        )}
        {children}
      </div>
      {!!onClose && (
        <Button
          aria-label="Modal close button"
          isIconOnly
          variant="light"
          radius="full"
          size={size}
          color={variant === "solid" ? (color === "default-inverted" ? "default" : "default-inverted") : color}
          onPress={onClose}
          className={styleSlots.closeButton({ className: classNames?.closeButton })}
          style={styles?.closeButton}
        >
          <XIcon />
        </Button>
      )}
    </div>
  );
}

const Alert = forwardRef(_Alert);

// exports

export { Alert };
