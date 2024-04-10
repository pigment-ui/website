"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { ForwardedRef, forwardRef } from "react";
import { Button, Input, SearchField as AriaSearchField, SearchFieldProps } from "react-aria-components";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentSearchFieldProps extends SearchFieldProps, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _SearchField(props: PigmentSearchFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaSearchField {...props}>
      {(renderProps) => (
        <Field {...renderProps} {...props}>
          <FieldInput
            startContent={<SearchIcon />}
            endButton={
              !renderProps.isEmpty ? (
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
export type { PigmentSearchFieldProps };
