"use client";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";
import { SearchIcon, XIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { Button, Input, InputProps, SearchField as AriaSearchField, SearchFieldProps as AriaSearchFieldProps } from "react-aria-components";

// props

interface SearchFieldProps
  extends AriaSearchFieldProps,
    Omit<InputProps, keyof AriaSearchFieldProps | "size" | "color">,
    FieldBaseProps,
    FieldInputBaseProps {
  hideClearButton?: boolean;
}

// component

function _SearchField(props: SearchFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  const { hideClearButton = false } = props;

  return (
    <AriaSearchField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput
            startContent={<SearchIcon />}
            endButton={
              !hideClearButton && !renderProps.isEmpty ? (
                <Button>
                  <XIcon />
                </Button>
              ) : undefined
            }
            {...renderProps}
            {...props}
          >
            <Input ref={ref} />
          </FieldInput>
        </Field>
      )}
    </AriaSearchField>
  );
}

const SearchField = forwardRef(_SearchField);

// exports

export { SearchField };
