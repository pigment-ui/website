"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps } from "react-aria";
import { Button, Tag as AriaTag, TagGroup as AriaTagGroup, TagGroupProps, TagList, TagListProps, TagProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { isDisabledVariants, isFocusVisibleVariants, radiusVariants } from "./styles";
import { ColorProps, ContentProps, FilterProps, ForwardRefType, RadiusProps, SizeProps, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Field, PigmentFieldBaseProps } from "./field";

// styles

const tagGroupStyles = tv({
  base: "flex flex-wrap",
  variants: {
    size: {
      sm: "gap-2",
      md: "gap-2.5",
      lg: "gap-3",
    },
  },
});

const tagStyles = tv({
  slots: {
    base: "flex items-center bg-opacity-10 overflow-hidden",
    removeButton: "grid place-items-center bg-opacity-20 data-[hovered]:bg-opacity-30 data-[pressed]:scale-95 outline-none",
  },
  variants: {
    color: {
      default: { base: "bg-default-1000", removeButton: "bg-default-1000" },
      info: { base: "bg-info-500", removeButton: "bg-info-500" },
      success: { base: "bg-success-500", removeButton: "bg-success-500" },
      warning: { base: "bg-warning-500", removeButton: "bg-warning-500" },
      error: { base: "bg-error-500", removeButton: "bg-error-500" },
    },
    size: {
      sm: { base: "h-6 px-2 gap-x-2 text-xs", removeButton: "h-4 w-4 [&_svg]:size-3" },
      md: { base: "h-8 px-2.5 gap-x-2.5 text-sm", removeButton: "h-5 w-5 [&_svg]:size-3.5" },
      lg: { base: "h-10 px-3 gap-x-3 text-base", removeButton: "h-6 w-6 [&_svg]:size-4" },
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

interface PigmentTagGroupProps<T extends object>
  extends Omit<FilterProps<TagGroupProps>, "children">,
    Pick<TagListProps<T>, "children" | "items" | "renderEmptyState">,
    ColorProps,
    SizeProps,
    RadiusProps,
    Omit<PigmentFieldBaseProps, "isRequired" | "labelNecessityIndicator"> {}

interface PigmentTagProps extends FilterProps<TagProps>, ColorProps, ContentProps, StyleSlotsToStyleProps<TagStylesReturnType> {}

// slots

interface TagGroupSlotsType extends Pick<PigmentTagGroupProps<any>, "color" | "size" | "radius"> {}

const [TagGroupSlotsProvider, useTagGroupSlots] = createSlots<TagGroupSlotsType>();

// component

function _TagGroup<T extends object>(props: PigmentTagGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { color = "default", size = "md", radius = "md", items, renderEmptyState, children } = props;

  return (
    <TagGroupSlotsProvider value={{ color, size, radius }}>
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

function _Tag(props: PigmentTagProps, ref: ForwardedRef<HTMLDivElement>) {
  const { color, size, radius, startContent, endContent, children, className, classNames, style, styles } = useTagGroupSlots(props);

  const styleSlots = tagStyles({ color, size, radius });

  return (
    <AriaTag
      ref={ref}
      {...props}
      className={({ isSelected, isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        styleSlots.base({
          isSelected,
          isHovered,
          isPressed,
          isDisabled,
          isFocusVisible,
          isSelectable: selectionMode !== "none",
          className: twMerge(classNames?.base, className),
        })
      }
      style={mergeProps(styles?.base, style)}
    >
      {({ allowsRemoving, isSelected }) => (
        <>
          {startContent}
          <span>{children}</span>
          {endContent}
          {allowsRemoving && (
            <Button
              slot="remove"
              className={styleSlots.removeButton({ isSelected, className: classNames?.removeButton })}
              style={styles?.removeButton}
            >
              <Cross2Icon />
            </Button>
          )}
        </>
      )}
    </AriaTag>
  );
}

const Tag = forwardRef(_Tag);

// exports

export { TagGroup, Tag };
export type { PigmentTagGroupProps, PigmentTagProps };
