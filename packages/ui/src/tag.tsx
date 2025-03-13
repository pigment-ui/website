"use client";

import { Field, FieldBaseProps, fieldButtonStyles } from "./field";
import { useGlobalProps } from "./provider";
import { radiusVariants, variantColorStyles } from "./styles";
import { ColorProps, ContentProps, ForwardRefType, RadiusProps, StyleSlotsToStyleProps, VariantProps, Variants } from "./types";
import { createSlots } from "./utils";
import { XIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import {
  Button,
  composeRenderProps,
  Tag as AriaTag,
  TagGroup as AriaTagGroup,
  TagGroupProps as AriaTagGroupProps,
  TagList,
  TagListProps,
  TagProps as AriaTagProps,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const tagGroupStyles = tv({
  base: "flex flex-wrap outline-none",
  variants: {
    size: { sm: "gap-2 text-xs", md: "gap-2.5 text-sm", lg: "gap-3 text-base" },
  },
});

const tagStyles = tv({
  extend: variantColorStyles,
  base: "",
  slots: {
    removeButton: fieldButtonStyles({ variant: "light", className: "rounded-full p-1 transition-transform" }),
  },
  variants: {
    size: {
      sm: { base: "h-6 gap-x-2 px-2 text-xs", removeButton: "[&_svg]:size-3" },
      md: { base: "h-8 gap-x-2.5 px-2.5 text-sm", removeButton: "[&_svg]:size-3.5" },
      lg: { base: "h-10 gap-x-3 px-3 text-base", removeButton: "[&_svg]:size-4" },
    },
    isSelectable: { true: "cursor-pointer", false: "cursor-default" },
    radius: radiusVariants,
  },
});

type TagStylesReturnType = ReturnType<typeof tagStyles>;

// props

interface TagGroupProps<T extends object>
  extends Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "children" | "items" | "renderEmptyState">,
    VariantProps,
    ColorProps,
    RadiusProps,
    FieldBaseProps {
  variantActive?: Variants;
  itemClassNames?: TagProps["classNames"];
  itemStyles?: TagProps["styles"];
}

interface TagProps extends AriaTagProps, VariantProps, ColorProps, ContentProps, StyleSlotsToStyleProps<TagStylesReturnType> {
  variantActive?: Variants;
}

// slots

interface TagGroupSlotsType
  extends Pick<TagGroupProps<any>, "variant" | "variantActive" | "color" | "size" | "radius" | "itemClassNames" | "itemStyles"> {}

const [TagGroupSlotsProvider, useTagGroupSlots] = createSlots<TagGroupSlotsType>();

// component

function _TagGroup<T extends object>(props: TagGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("TagGroup", props, {
    variant: "soft",
    variantActive: "solid",
    color: "default",
    size: "md",
    radius: props.size || "md",
  });

  const { variant, variantActive, color, size, radius, items, renderEmptyState, children, itemClassNames, itemStyles } = globalProps;

  return (
    <TagGroupSlotsProvider value={{ variant, variantActive, color, size, radius, itemClassNames, itemStyles }}>
      <AriaTagGroup ref={ref} {...globalProps}>
        <Field {...globalProps}>
          <TagList items={items} renderEmptyState={renderEmptyState} className={tagGroupStyles({ size })}>
            {children}
          </TagList>
        </Field>
      </AriaTagGroup>
    </TagGroupSlotsProvider>
  );
}

const TagGroup = (forwardRef as ForwardRefType)(_TagGroup);

function _Tag(props: TagProps, ref: ForwardedRef<HTMLDivElement>) {
  const { variant, variantActive, color, size, radius, startContent, endContent, classNames, itemClassNames, styles, itemStyles } =
    useTagGroupSlots(props);

  const styleSlots = tagStyles({ variant, color, size, radius });

  return (
    <AriaTag
      ref={ref}
      id={typeof props.children === "string" ? props.children : undefined}
      textValue={typeof props.children === "string" ? props.children : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, { isSelected, isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        styleSlots.base({
          variant: isSelected ? variantActive : variant,
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
      {composeRenderProps(props.children, (children, { allowsRemoving }) => (
        <>
          {startContent}
          {children}
          {endContent}
          {allowsRemoving && (
            <Button
              slot="remove"
              className={styleSlots.removeButton({ className: twMerge(itemClassNames?.removeButton, classNames?.removeButton) })}
              style={mergeProps(itemStyles?.removeButton, styles?.removeButton)}
            >
              <XIcon />
            </Button>
          )}
        </>
      ))}
    </AriaTag>
  );
}

const Tag = forwardRef(_Tag);

// exports

export { TagGroup, Tag };
