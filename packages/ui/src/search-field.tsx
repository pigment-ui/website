"use client";

import { FieldInput, FieldInputBaseProps } from "./field";
import { SearchIcon, XIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { Button, Input, InputProps, SearchField as AriaSearchField, SearchFieldProps as AriaSearchFieldProps } from "react-aria-components";

// props

interface SearchFieldProps extends AriaSearchFieldProps, Omit<InputProps, keyof AriaSearchFieldProps | "size" | "color">, FieldInputBaseProps {
  hideClearButton?: boolean;
}

// component

function _SearchField(props: SearchFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  const { hideClearButton = false } = props;

  return (
    <AriaSearchField {...props}>
      {(renderProps) => (
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
      )}
    </AriaSearchField>
  );
}

const SearchField = forwardRef(_SearchField);

// exports

export { SearchField };
