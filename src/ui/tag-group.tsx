"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { Button, Tag as AriaTag, TagGroup as AriaTagGroup, TagGroupProps, TagList, TagListProps, TagProps } from "react-aria-components";
import { tv } from "tailwind-variants";
import { ContentProps, FilterProps, ForwardRefType, RadiusProps, SizeProps, StylesSlotsToStyleProps } from "./types";
import { Field, PigmentFieldBaseProps } from "./field";
import { createSlots } from "#/ui/utils";
import { isDisabledVariants, isFocusVisibleVariants, isPressedVariants, radiusVariants } from "#/ui/styles";
import { twMerge } from "tailwind-merge";
import { mergeProps } from "react-aria";

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
    base: "flex items-center bg-default-1000 bg-opacity-10 overflow-hidden",
    removeButton: "grid place-items-center bg-default-1000 bg-opacity-10 data-[hovered]:bg-opacity-20 data-[pressed]:scale-95 outline-none",
  },
  variants: {
    size: {
      sm: { base: "h-6 px-2 gap-x-2 text-xs", removeButton: "h-4 w-4 [&>svg]:h-3 [&>svg]:w-3" },
      md: { base: "h-8 px-2.5 gap-x-2.5 text-sm", removeButton: "h-5 w-5 [&>svg]:h-4 [&>svg]:w-4" },
      lg: { base: "h-10 px-3 gap-x-3 text-base", removeButton: "h-6 w-6 [&>svg]:h-5 [&>svg]:w-5" },
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
    isFocusWithin: { true: "bg-opacity-30" },
    ...isFocusVisibleVariants,
    ...isDisabledVariants,
    ...isPressedVariants,
  },
  compoundVariants: [{ isSelected: true, isHovered: true, className: { base: "bg-opacity-90" } }],
});

type TagStylesReturnType = ReturnType<typeof tagStyles>;

// props

interface PigmentTagGroupProps<T extends object>
  extends Omit<FilterProps<TagGroupProps>, "children">,
    Pick<TagListProps<T>, "children" | "items" | "renderEmptyState">,
    SizeProps,
    RadiusProps,
    PigmentFieldBaseProps {}

interface PigmentTagProps extends FilterProps<TagProps>, ContentProps, StylesSlotsToStyleProps<TagStylesReturnType> {}

// slots

interface TagGroupSlotsType extends Pick<PigmentTagGroupProps<any>, "size" | "radius"> {}

const [TagGroupSlotsProvider, useTagGroupSlots] = createSlots<TagGroupSlotsType>();

// component

function _TagGroup<T extends object>(props: PigmentTagGroupProps<T>, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", radius = "md", items, renderEmptyState, children } = props;

  return (
    <TagGroupSlotsProvider value={{ size, radius }}>
      <AriaTagGroup ref={ref} {...props}>
        <Field {...props} className="" style={{}}>
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
  const { size, radius, startContent, endContent, children, className, classNames, style, styles } = useTagGroupSlots(props);

  const stylesSlots = tagStyles({ size, radius });

  return (
    <AriaTag
      // @ts-ignore
      shouldSelectOnPressUp
      ref={ref}
      id={typeof children === "string" ? children : undefined}
      {...props}
      className={({ isSelected, isHovered, isPressed, isDisabled, isFocusVisible, selectionMode }) =>
        stylesSlots.base({
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
          {children}
          {endContent}
          {allowsRemoving && (
            <Button
              slot="remove"
              className={stylesSlots.removeButton({ isSelected, className: classNames?.removeButton })}
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
