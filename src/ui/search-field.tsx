"use client";

import { Cross2Icon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, Input, SearchField as AriaSearchField, SearchFieldProps } from "react-aria-components";

import { FilterProps } from "./types";

import { Field, FieldInput, PigmentFieldBaseProps, PigmentFieldInputBaseProps } from "./field";

// props

interface PigmentSearchFieldProps extends FilterProps<SearchFieldProps>, PigmentFieldBaseProps, PigmentFieldInputBaseProps {}

// component

function _SearchField(props: PigmentSearchFieldProps, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <AriaSearchField {...props}>
      {({ isEmpty }) => (
        <Field {...props} className="" style={{}}>
          <FieldInput
            startContent={<MagnifyingGlassIcon />}
            endButton={
              !isEmpty ? (
                <Button>
                  <Cross2Icon />
                </Button>
              ) : undefined
            }
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
