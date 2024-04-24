"use client";

import { ForwardedRef, forwardRef } from "react";
import { Button, Input, SearchField as AriaSearchField, SearchFieldProps as AriaSearchFieldProps } from "react-aria-components";

import { SearchIcon, XIcon } from "lucide-react";

import { Field, FieldBaseProps, FieldInput, FieldInputBaseProps } from "./field";

// props

interface SearchFieldProps extends AriaSearchFieldProps, FieldBaseProps, FieldInputBaseProps {
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
export type { SearchFieldProps };
