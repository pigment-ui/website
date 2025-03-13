"use client";

import { useFieldButtonStyles } from "./field";
import { useGlobalProps } from "./provider";
import { radiusVariants, useVariantAndColorStyles } from "./styles";
import { ColorProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon, XIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from "react";
import { mergeProps } from "react-aria";
import { Button as AriaButton } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const useAlertStyles = () =>
  tv({
    extend: useVariantAndColorStyles(),
    base: "!items-start",
    slots: {
      contentWrapper: "flex-1",
      title: "font-bold",
      description: "",
      icon: "",
      closeButton: useFieldButtonStyles()({ variant: "light", className: "absolute right-2 top-2 z-10 rounded-full p-2" }),
    },
    variants: {
      size: {
        sm: {
          base: ["gap-3 p-3", radiusVariants.sm],
          title: "text-sm",
          description: "text-xs",
          icon: "[&>svg]:size-6",
          closeButton: "[&>svg]:size-3",
        },
        md: {
          base: ["gap-4 p-4", radiusVariants.md],
          title: "text-base",
          description: "text-sm",
          icon: "[&>svg]:size-8",
          closeButton: "[&>svg]:size-4",
        },
        lg: {
          base: ["gap-5 p-5", radiusVariants.lg],
          title: "text-lg",
          description: "text-base",
          icon: "[&>svg]:size-10",
          closeButton: "[&>svg]:size-5",
        },
      },
    },
  });

type AlertStylesReturnType = ReturnType<ReturnType<typeof useAlertStyles>>;

// props

interface AlertProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "color">,
    ColorProps,
    VariantProps,
    SizeProps,
    StyleSlotsToStyleProps<AlertStylesReturnType> {
  title?: string;
  description?: string;
  icon?: ReactNode;
  hideIcon?: boolean;
  onClose?: () => void;
}

// component

function _Alert(props: AlertProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("Alert", props, { variant: "solid", color: "default", size: "md" });

  const { title, description, variant, color, size, icon, hideIcon, onClose, className, classNames, style, styles, children, ...restProps } =
    globalProps;

  const styleSlots = useAlertStyles()({ variant, color, size });

  return (
    <div
      ref={ref}
      {...restProps}
      className={styleSlots.base({ className: twMerge(classNames?.base, className) })}
      style={mergeProps(styles?.base, style)}
    >
      {!hideIcon && (
        <div className={styleSlots.icon({ className: classNames?.icon })} style={styles?.icon}>
          {icon ||
            (color === "success" ? (
              <CircleCheckIcon />
            ) : color === "warning" ? (
              <CircleAlertIcon />
            ) : color === "error" ? (
              <CircleXIcon />
            ) : (
              <InfoIcon />
            ))}
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

        <div>{children}</div>
      </div>

      {!!onClose && (
        <AriaButton
          aria-label="Alert close button"
          onPress={onClose}
          className={styleSlots.closeButton({ className: classNames?.closeButton })}
          style={styles?.closeButton}
        >
          <XIcon />
        </AriaButton>
      )}
    </div>
  );
}

const Alert = forwardRef(_Alert);
Alert.displayName = "Alert";

// exports

export { Alert };
