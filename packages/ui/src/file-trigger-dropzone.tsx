"use client";

import { Button } from "./button";
import { Field, FieldBaseProps } from "./field";
import { radiusVariants, variantColorStyles } from "./styles";
import { ColorProps, StyleProps, StyleSlotsToStyleProps, VariantProps, Variants } from "./types";
import { useFormValidationState } from "@react-stately/form";
import React, { ComponentPropsWithoutRef } from "react";
import { AriaFieldProps, FileDropItem, mergeProps, useField } from "react-aria";
import { DropZone, FieldErrorContext, FileTrigger, Provider, Text, TextContext } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const fileTriggerBlockStyles = tv({
  extend: variantColorStyles,
  base: "flex-col text-center",
  slots: {
    wrapper: "",
    button: "",
    text: "",
  },
  variants: {
    size: {
      sm: { base: ["gap-4 p-4", radiusVariants.sm], text: "text-xs" },
      md: { base: ["gap-5 p-5", radiusVariants.md], text: "text-sm" },
      lg: { base: ["gap-6 p-6", radiusVariants.lg], text: "text-base" },
    },
  },
});

type FileTriggerDropzoneStylesReturnType = ReturnType<typeof fileTriggerBlockStyles>;

// props

interface FileTriggerDropzoneProps
  extends Pick<ComponentPropsWithoutRef<typeof FileTrigger>, "acceptedFileTypes" | "acceptDirectory" | "allowsMultiple" | "defaultCamera">,
    AriaFieldProps,
    VariantProps,
    ColorProps,
    FieldBaseProps,
    StyleProps,
    StyleSlotsToStyleProps<FileTriggerDropzoneStylesReturnType> {
  variantButton?: Variants;
  value: File[];
  onChange: (files: File[]) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  placeholder?: string;
  buttonLabel?: string;
}

// component

function FileTriggerDropzone(props: FileTriggerDropzoneProps) {
  const {
    variant = "soft",
    variantButton = "solid",
    color = "default",
    size = "md",
    placeholder,
    buttonLabel,
    value,
    onChange,
    isDisabled,
    isLoading,
    isInvalid,
    acceptedFileTypes,
    acceptDirectory,
    allowsMultiple,
    defaultCamera,
    className,
    classNames,
    style,
    styles,
  } = props;

  const { displayValidation } = useFormValidationState({ ...props, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...props });

  const styleSlots = fileTriggerBlockStyles({
    variant,
    color: isInvalid || displayValidation.isInvalid ? "error" : color,
    size,
    isDisabled: isDisabled || isLoading,
  });

  return (
    <Provider
      values={[
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, displayValidation],
      ]}
    >
      <div
        {...fieldProps}
        className={styleSlots.wrapper({ className: twMerge(classNames?.wrapper, className) })}
        style={mergeProps(styles?.wrapper, style)}
      >
        <Field {...displayValidation} {...props}>
          <DropZone
            onDrop={async (e) => {
              if (!e) return;
              let files = await Promise.all(e.items.filter((item) => item.kind === "file").map((item: FileDropItem) => item.getFile()));
              onChange?.(files);
            }}
            isDisabled={isDisabled || isLoading}
            className={({ isDropTarget, isFocusVisible }) =>
              styleSlots.base({ isHovered: isDropTarget, isFocusVisible, className: classNames?.base })
            }
            style={styles?.base}
          >
            <FileTrigger
              onSelect={(e) => {
                if (!e) return;
                let files = Array.from(e);
                onChange?.(files);
              }}
              acceptedFileTypes={acceptedFileTypes}
              acceptDirectory={acceptDirectory}
              allowsMultiple={allowsMultiple}
              defaultCamera={defaultCamera}
            >
              <Button
                variant={variantButton}
                color={isInvalid || displayValidation.isInvalid ? "error" : color}
                size={size}
                isLoading={isLoading}
                isDisabled={isDisabled}
                className={styleSlots.button({ className: classNames?.button })}
                style={styles?.button}
              >
                {buttonLabel ?? `Select file${allowsMultiple ? "s" : ""}`}
              </Button>
            </FileTrigger>

            <Text slot="label" className={styleSlots.text({ className: classNames?.text })} style={styles?.text}>
              {value?.length > 0
                ? value?.map((file) => file.name).join(", ")
                : placeholder || `Drag and drop file${allowsMultiple ? "s" : ""} here or click to select`}
            </Text>
          </DropZone>
        </Field>
      </div>
    </Provider>
  );
}

// exports

export { FileTriggerDropzone };
