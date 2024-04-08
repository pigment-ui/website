"use client";

import { AriaColorFieldProps, useColorField } from "@react-aria/color";
import { filterDOMProps } from "@react-aria/utils";
import { ColorFieldState, useColorFieldState } from "@react-stately/color";
import { DOMProps } from "@react-types/shared";
import { ForwardedRef, forwardRef, useRef } from "react";
import { useField } from "react-aria";
import { Input, InputContext, LabelContext, Provider, SlotProps, TextContext } from "react-aria-components";

import { FilterProps } from "./types";
import { RACValidation, removeDataAttributes, RenderProps, useRenderProps, useSlot } from "./utils-react-aria";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface ColorFieldRenderProps {
  /**
   * Whether the color field is disabled.
   * @selector [data-disabled]
   */
  isDisabled: boolean;
  /**
   * Whether the color field is invalid.
   * @selector [data-invalid]
   */
  isInvalid: boolean;
  /**
   * State of the color field.
   */
  state: ColorFieldState;
}

interface ColorFieldProps
  extends Omit<AriaColorFieldProps, "label" | "placeholder" | "description" | "errorMessage" | "validationState" | "validationBehavior">,
    RACValidation,
    Omit<DOMProps, "style" | "className" | "children">,
    SlotProps,
    RenderProps<ColorFieldRenderProps> {
  /** Whether the value is invalid. */
  isInvalid?: boolean;
}

interface PigmentColorFieldProps extends FilterProps<ColorFieldProps>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _AriaColorField(props: ColorFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  let validationBehavior = props.validationBehavior ?? "native";
  let inputRef = useRef(null);
  let [labelRef, label] = useSlot();
  let ariaProps = { ...removeDataAttributes(props), label, validationBehavior };

  let state = useColorFieldState(ariaProps);
  let { labelProps, inputProps, ...validation } = useColorField(ariaProps, state, inputRef);
  let { descriptionProps, errorMessageProps } = useField(ariaProps);

  let renderProps = useRenderProps({
    ...props,
    values: {
      state,
      isDisabled: props.isDisabled || false,
      isInvalid: validation.isInvalid,
    },
    defaultClassName: "react-aria-ColorField",
  });

  let DOMProps = filterDOMProps(props);
  delete DOMProps.id;

  return (
    <div
      {...DOMProps}
      {...renderProps}
      ref={ref}
      slot={props.slot || undefined}
      data-disabled={props.isDisabled || undefined}
      data-invalid={validation.isInvalid || undefined}
      data-readonly={props.isReadOnly || undefined}
      data-required={props.isRequired || undefined}
    >
      <Provider
        values={[
          [LabelContext, { ...labelProps, ref: labelRef }],
          [InputContext, { ...inputProps, ref: inputRef }],
          [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
          // [FieldErrorContext, validation],
        ]}
      >
        {renderProps.children}
      </Provider>
    </div>
  );
}

const AriaColorField = forwardRef(_AriaColorField);

function _ColorField(props: PigmentColorFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaColorField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput {...renderProps} {...props}>
            <Input ref={ref} />
          </FieldInput>
        </Field>
      )}
    </AriaColorField>
  );
}

const ColorField = forwardRef(_ColorField);

// exports

export { ColorField };
export type { PigmentColorFieldProps };
