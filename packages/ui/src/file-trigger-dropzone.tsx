"use client";

import { FieldBaseProps, FieldInput, FieldInputBaseProps, useFieldButtonStyles } from "./field";
import { useGlobalProps } from "./provider";
import { radiusVariants } from "./styles";
import { ColorProps, StyleProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { useFormValidationState } from "@react-stately/form";
import React, { ComponentPropsWithoutRef } from "react";
import { AriaFieldProps, FileDropItem, mergeProps, useField } from "react-aria";
import { Button, DropZone, FieldErrorContext, FileTrigger, Provider, Text, TextContext } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const useFileTriggerBlockStyles = () =>
  tv({
    slots: {
      base: "",
      zone: "flex w-full flex-col items-center text-center",
      button: useFieldButtonStyles()({ className: "data-[pressed]:scale-95" }),
      text: "",
    },
    variants: {
      size: {
        sm: { base: radiusVariants.sm, zone: "gap-4 p-4", button: ["h-8 px-4 text-sm", radiusVariants.sm], text: "text-xs" },
        md: { base: radiusVariants.md, zone: "gap-5 p-5", button: ["h-10 px-5 text-base", radiusVariants.md], text: "text-sm" },
        lg: { base: radiusVariants.lg, zone: "gap-6 p-6", button: ["h-12 px-6 text-lg", radiusVariants.lg], text: "text-base" },
      },
    },
  });

type FileTriggerDropzoneStylesReturnType = ReturnType<ReturnType<typeof useFileTriggerBlockStyles>>;

// props

interface FileTriggerDropzoneProps
  extends Pick<ComponentPropsWithoutRef<typeof FileTrigger>, "acceptedFileTypes" | "acceptDirectory" | "allowsMultiple" | "defaultCamera">,
    AriaFieldProps,
    VariantProps,
    ColorProps,
    FieldBaseProps,
    FieldInputBaseProps,
    StyleProps,
    StyleSlotsToStyleProps<FileTriggerDropzoneStylesReturnType> {
  value: File[];
  onChange: (files: File[]) => void;
  isDisabled?: boolean;
  placeholder?: string;
  buttonLabel?: string;
}

// component

function FileTriggerDropzone(props: FileTriggerDropzoneProps) {
  const globalProps = useGlobalProps("FileTriggerDropzone", props, { variant: "soft", color: "default", size: "md" });

  const {
    variant,
    color,
    size,
    placeholder,
    buttonLabel,
    value,
    onChange,
    isDisabled,
    isInvalid,
    acceptedFileTypes,
    acceptDirectory,
    allowsMultiple,
    defaultCamera,
    className,
    classNames,
    style,
    styles,
  } = globalProps;

  const { displayValidation } = useFormValidationState({ ...globalProps, value });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...globalProps });

  const styleSlots = useFileTriggerBlockStyles()({ variant, color: isInvalid || displayValidation.isInvalid ? "error" : color, size, isDisabled });

  return (
    <Provider
      values={[
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, displayValidation],
      ]}
    >
      <div {...fieldProps} className={styleSlots.base({ className: twMerge(classNames?.base, className) })} style={mergeProps(styles?.base, style)}>
        <FieldInput
          {...displayValidation}
          {...globalProps}
          isAutoHeight
          fieldInputClassNames={{ ...globalProps.fieldInputClassNames, base: twMerge("cursor-default", globalProps.fieldInputClassNames?.base) }}
        >
          <div>
            <DropZone
              onDrop={async (e) => {
                if (!e) return;
                let files = await Promise.all(e.items.filter((item) => item.kind === "file").map((item: FileDropItem) => item.getFile()));
                onChange?.(files);
              }}
              isDisabled={isDisabled}
              className={({ isDropTarget, isFocusVisible }) =>
                styleSlots.zone({ isHovered: isDropTarget, isFocusVisible, className: classNames?.zone })
              }
              style={styles?.zone}
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
                  aria-label="File trigger button"
                  isDisabled={isDisabled}
                  className={styleSlots.button({ className: classNames?.button })}
                  style={styles?.button}
                >
                  {buttonLabel ?? `Select ${allowsMultiple ? "" : "a"} file${allowsMultiple ? "s" : ""}`}
                </Button>
              </FileTrigger>

              <Text slot="label" className={styleSlots.text({ className: classNames?.text })} style={styles?.text}>
                {value?.length > 0
                  ? value?.map((file) => file.name).join(", ")
                  : placeholder || `Drag and drop ${allowsMultiple ? "" : "a"} file${allowsMultiple ? "s" : ""} here or click to select`}
              </Text>
            </DropZone>
          </div>
        </FieldInput>
      </div>
    </Provider>
  );
}

// exports

export { FileTriggerDropzone };
