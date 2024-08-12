"use client";

import { ForwardedRef, forwardRef } from "react";
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

import { XIcon } from "lucide-react";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants } from "./styles";
import { ColorProps, ContentProps, ForwardRefType, RadiusProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Field, FieldBaseProps } from "./field";

// styles

const tagGroupStyles = tv({
  base: "flex flex-wrap outline-none",
  variants: {
    size: { sm: "gap-2 text-xs", md: "gap-2.5 text-sm", lg: "gap-3 text-base" },
  },
});

const tagStyles = tv({
  slots: {
    base: "flex items-center bg-opacity-10 overflow-hidden duration-300",
    removeButton: "grid place-items-center bg-opacity-20 data-[hovered]:bg-opacity-30 data-[pressed]:scale-90 outline-none",
  },
  variants: {
    color: {
      default: { base: "bg-default-1000", removeButton: "bg-default-1000" },
      "default-inverted": { base: "bg-default-0", removeButton: "bg-default-0" },
      primary: { base: "bg-primary-500", removeButton: "bg-primary-500" },
      info: { base: "bg-info-500", removeButton: "bg-info-500" },
      success: { base: "bg-success-500", removeButton: "bg-success-500" },
      warning: { base: "bg-warning-500", removeButton: "bg-warning-500" },
      error: { base: "bg-error-500", removeButton: "bg-error-500" },
    },
    size: {
      sm: { base: "h-6 px-2 gap-x-2 text-xs", removeButton: "size-4 [&_svg]:size-3" },
      md: { base: "h-8 px-2.5 gap-x-2.5 text-sm", removeButton: "size-5 [&_svg]:size-3.5" },
      lg: { base: "h-10 px-3 gap-x-3 text-base", removeButton: "size-6 [&_svg]:size-4" },
    },
    radius: {
      sm: { base: radiusVariants.radius.sm, removeButton: radiusVariants.radius.sm },
      md: { base: radiusVariants.radius.md, removeButton: radiusVariants.radius.md },
      lg: { base: radiusVariants.radius.lg, removeButton: radiusVariants.radius.lg },
      full: { base: radiusVariants.radius.full, removeButton: radiusVariants.radius.full },
      none: { base: radiusVariants.radius.none, removeButton: radiusVariants.radius.none },
    },
    isSelectable: { true: "cursor-pointer", false: "cursor-default" },
    isSelected: { true: { base: "bg-opacity-100 text-default-0", removeButton: "bg-default-0" } },
    isHovered: { true: "bg-opacity-20" },
    isPressed: { true: "scale-95" },
    isFocusWithin: { true: "bg-opacity-30" },
    ...isFocusVisibleVariants,
    ...isDisabledVariants,
  },
  compoundVariants: [{ isSelected: true, isHovered: true, className: { base: "bg-opacity-90" } }],
});

type TagStylesReturnType = ReturnType<typeof tagStyles>;

// props

interface TagGroupProps<T extends object>
  extends Omit<AriaTagGroupProps, "children">,
    Pick<TagListProps<T>, "children" | "items" | "renderEmptyState">,
    ColorProps,
    RadiusProps,
    FieldBaseProps {
  itemClassNames?: TagProps["classNames"];
  itemStyles?: TagProps["styles"];
}

interface TagProps extends AriaTagProps, ColorProps, ContentProps, StyleSlotsToStyleProps<TagStylesReturnType> {}

// slots

interface TagGroupSlotsType extends Pick<TagGroupProps<any>, "color" | "size" | "radius" | "itemClassNames" | "itemStyles"> {}

const [TagGroupSlotsProvider, useTagGroupSlots] = createSlots<TagGroupSlotsType>();

// component

function _TagGroup<T extends object>(props: TagGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", radius = "md", items, renderEmptyState, children, itemClassNames, itemStyles } = props;

  return (
    <TagGroupSlotsProvider value={{ color, size, radius, itemClassNames, itemStyles }}>
      <AriaTagGroup ref={ref} {...props}>
        <Field {...props}>
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
  const { color, size, radius, startContent, endContent, classNames, itemClassNames, styles, itemStyles } = useTagGroupSlots(props);

  const styleSlots = tagStyles({ color, size, radius });

  return (
    <AriaTag
      ref={ref}
      id={typeof props.children === "string" ? props.children : undefined}
      textValue={typeof props.children === "string" ? props.children : undefined}
      {...props}
      className={composeRenderProps(props.className, (className, { isSelected, isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        styleSlots.base({
          isSelected,
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
      {composeRenderProps(props.children, (children, { allowsRemoving, isSelected }) => (
        <>
          {startContent}
          <span>{children}</span>
          {endContent}
          {allowsRemoving && (
            <Button
              slot="remove"
              className={styleSlots.removeButton({ isSelected, className: twMerge(itemClassNames?.removeButton, classNames?.removeButton) })}
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
export type { TagGroupProps, TagProps };
