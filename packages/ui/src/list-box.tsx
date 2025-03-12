"use client";

import { cardStyles } from "./card";
import { Field, FieldBaseProps } from "./field";
import { isFocusVisibleVariants, smallRadiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ContentProps, ForwardRefType, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { createSlots } from "./utils";
import { FormValidationProps, useFormValidationState } from "@react-stately/form";
import { CheckIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef, ReactNode } from "react";
import { Key, mergeProps, useField } from "react-aria";
import {
  Collection,
  composeRenderProps,
  FieldErrorContext,
  Header,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  ListBoxItemProps as AriaListBoxItemProps,
  ListBoxProps as AriaListBoxProps,
  ListBoxSection as AriaListBoxSection,
  ListBoxSectionProps as AriaListBoxSectionProps,
  Provider,
  TextContext,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const listBoxStyles = tv({
  variants: {
    asCard: { true: cardStyles().base({ className: "p-2" }) },
    isFocusVisible: isFocusVisibleVariants,
  },
});

const listBoxItemStyles = tv({
  extend: variantColorStyles,
  base: "!scale-100 !backdrop-blur-none",
  slots: {
    content: "flex-1",
    icon: "transition-transform duration-300",
  },
  variants: {
    size: {
      sm: { base: ["mt-0.5 gap-x-1 p-1 text-xs [&_svg]:size-3", smallRadiusVariants.sm] },
      md: { base: ["mt-1 gap-x-2 p-2 text-sm [&_svg]:size-4", smallRadiusVariants.md] },
      lg: { base: ["mt-1.5 gap-x-3 p-3 text-base [&_svg]:size-5", smallRadiusVariants.lg] },
    },
    isSelectable: {
      true: "cursor-pointer",
      false: "cursor-default",
    },
    isSelected: {
      false: { icon: "scale-0" },
    },
  },
});

type ListBoxItemStylesReturnType = ReturnType<typeof listBoxItemStyles>;

const listBoxSectionStyles = tv({
  extend: variantColorStyles,
  slots: {
    base: "first:pt-0 last:pb-0",
    title: "font-bold",
  },
  variants: {
    size: {
      sm: { base: "py-1", title: "mb-1 p-1 text-xs" },
      md: { base: "py-2", title: "mb-2 p-2 text-sm" },
      lg: { base: "py-3", title: "mb-3 p-3 text-base" },
    },
  },
  defaultVariants: { variant: "light" },
});

type ListBoxSectionStylesReturnType = ReturnType<typeof listBoxSectionStyles>;

// props

interface ListBoxProps<T extends object>
  extends AriaListBoxProps<T>,
    Omit<FormValidationProps<"all" | Iterable<Key> | undefined>, "value" | "builtinValidation">,
    FieldBaseProps,
    VariantProps,
    ColorProps,
    SizeProps {
  asCard?: boolean;
  icon?: ReactNode;
  itemClassNames?: ListBoxItemProps["classNames"];
  itemStyles?: ListBoxItemProps["styles"];
  sectionClassNames?: ListBoxSectionProps<T>["classNames"];
  sectionStyles?: ListBoxSectionProps<T>["styles"];
}

interface ListBoxItemProps extends AriaListBoxItemProps, VariantProps, ColorProps, ContentProps, StyleSlotsToStyleProps<ListBoxItemStylesReturnType> {
  icon?: ReactNode;
}

interface ListBoxSectionProps<T extends object> extends AriaListBoxSectionProps<T>, StyleSlotsToStyleProps<ListBoxSectionStylesReturnType> {
  title: string;
}

// slots

interface ListBoxSlotsType<T extends object>
  extends Pick<
    ListBoxProps<T>,
    "variant" | "color" | "size" | "itemClassNames" | "itemStyles" | "sectionClassNames" | "sectionStyles" | "items" | "children"
  > {}

const [ListBoxSlotsProvider, useListBoxSlots] = createSlots<ListBoxSlotsType<object>>();

// component

function _ListBox<T extends object>(props: ListBoxProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const {
    selectedKeys,
    asCard = true,
    variant = "light",
    color = "default",
    size = "md",
    itemClassNames,
    itemStyles,
    sectionClassNames,
    sectionStyles,
  } = props;

  const { displayValidation } = useFormValidationState({ ...props, value: selectedKeys });
  const { fieldProps, descriptionProps, errorMessageProps } = useField({ validationBehavior: "native", ...displayValidation, ...props });

  return (
    <Provider
      values={[
        [TextContext, { slots: { description: descriptionProps, errorMessage: errorMessageProps } }],
        [FieldErrorContext, displayValidation],
      ]}
    >
      <ListBoxSlotsProvider
        value={{ variant, color: displayValidation.isInvalid ? "error" : color, size, itemClassNames, itemStyles, sectionClassNames, sectionStyles }}
      >
        <Field {...displayValidation} {...props}>
          <AriaListBox
            ref={ref}
            {...mergeProps(props, fieldProps)}
            className={composeRenderProps(props.className, (className, { isFocusVisible }) => listBoxStyles({ asCard, isFocusVisible, className }))}
          />
        </Field>
      </ListBoxSlotsProvider>
    </Provider>
  );
}

const ListBox = (forwardRef as ForwardRefType)(_ListBox);

function _ListBoxItem(props: ListBoxItemProps, ref: ForwardedRef<HTMLDivElement>) {
  const { variant, color, size, startContent, endContent, icon, classNames, itemClassNames, styles, itemStyles } = useListBoxSlots(props);

  const styleSlots = listBoxItemStyles({ color, size });

  return (
    <AriaListBoxItem
      ref={ref}
      id={typeof props.children === "string" ? props.children : undefined}
      textValue={typeof props.children === "string" ? props.children : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, { isHovered, isPressed, isDisabled, isFocusVisible, selectionMode, isSelected }) =>
        styleSlots.base({
          variant: isSelected ? variant : "light",
          isHovered,
          isPressed,
          isDisabled,
          isFocusVisible,
          isSelectable: selectionMode !== "none",
          className: twMerge(itemClassNames?.base, classNames?.base, className),
        }),
      )}
      style={composeRenderProps(props.style, (style) => mergeProps(itemStyles?.base, styles?.base, style))}
    >
      {composeRenderProps(props.children, (children, { isSelected, selectionMode }) => (
        <>
          {startContent}
          <div
            className={styleSlots.content({ className: twMerge(itemClassNames?.content, classNames?.content) })}
            style={mergeProps(itemStyles?.content, styles?.content)}
          >
            {children}
          </div>
          {selectionMode !== "none" && (
            <div
              className={styleSlots.icon({ isSelected, className: twMerge(itemClassNames?.icon, classNames?.icon) })}
              style={mergeProps(itemStyles?.icon, styles?.icon)}
            >
              {icon ?? <CheckIcon />}
            </div>
          )}
          {endContent}
        </>
      ))}
    </AriaListBoxItem>
  );
}

const ListBoxItem = forwardRef(_ListBoxItem);

function _ListBoxSection<T extends object>(props: ListBoxSectionProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { title, items, color, size, className, classNames, sectionClassNames, style, styles, sectionStyles, children } = useListBoxSlots(props);

  const styleSlots = listBoxSectionStyles({ color, size });

  return (
    <AriaListBoxSection
      ref={ref}
      className={styleSlots.base({ className: twMerge(sectionClassNames?.base, classNames?.base, className) })}
      style={mergeProps(sectionStyles?.base, styles?.base, style)}
    >
      <Header
        className={styleSlots.title({ className: twMerge(sectionClassNames?.title, classNames?.title) })}
        style={mergeProps(sectionStyles?.title, styles?.title)}
      >
        {title}
      </Header>
      <Collection items={items}>{children}</Collection>
    </AriaListBoxSection>
  );
}

const ListBoxSection = (forwardRef as ForwardRefType)(_ListBoxSection);

// exports

export { ListBox, ListBoxItem, ListBoxSection, listBoxItemStyles, listBoxSectionStyles };
export type { ListBoxItemProps, ListBoxSectionProps, ListBoxSlotsType };

export const filterInlineListBoxProps = (props: any) => ({
  "aria-label": props["aria-label"] || props.label,
  asCard: false,
  children: props.children,
  items: props.items,
  variant: props.variant,
  color: props.isInvalid ? "error" : props.color,
  size: props.size,
  itemStartContent: props.itemStartContent,
  itemEndContent: props.itemEndContent,
  itemClassNames: props.itemClassNames,
  itemStyles: props.itemStyles,
  sectionClassNames: props.sectionClassNames,
  sectionStyles: props.sectionStyles,
});
