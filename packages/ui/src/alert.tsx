"use client";

import { Button } from "./button";
import { radiusVariants, variantColorStyles } from "./styles";
import { ColorExtendedProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon, XIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const alertStyles = tv({
  extend: variantColorStyles,
  base: ["!items-start", radiusVariants.md],
  slots: {
    contentWrapper: "flex-1",
    title: "font-bold",
    description: "",
    icon: "",
    closeButton: "",
  },
  variants: {
    size: {
      sm: { base: "gap-4 p-4", title: "text-sm", description: "text-xs", icon: "[&_svg]:size-8" },
      md: { base: "gap-5 p-5", title: "text-base", description: "text-sm", icon: "[&_svg]:size-10" },
      lg: { base: "gap-6 p-6", title: "text-lg", description: "text-base", icon: "[&_svg]:size-12" },
    },
  },
});

type AlertStylesReturnType = ReturnType<typeof alertStyles>;

// props

interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    ColorExtendedProps,
    VariantProps,
    SizeProps,
    StyleSlotsToStyleProps<AlertStylesReturnType> {
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
          aria-label="Alert close button"
          isCompact
          variant="soft"
          radius="full"
          size={size}
          color={variant === "solid" ? (color === "inverted" ? "default" : "inverted") : color}
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
