import { useGlobalProps } from "./provider";
import { radiusVariants, useVariantAndColorStyles } from "./styles";
import { ColorProps, ContentProps, SizeProps, StyleSlotsToStyleProps, VariantProps } from "./types";
import { createSlots } from "./utils";
import { ChevronDown } from "lucide-react";
import React, { ComponentPropsWithoutRef, ForwardedRef, forwardRef, ReactNode, useState } from "react";
import { mergeProps } from "react-aria";
import {
  Button,
  composeRenderProps,
  Disclosure as AriaDisclosure,
  DisclosureGroup as AriaDisclosureGroup,
  DisclosureGroupProps as AriaDisclosureGroupProps,
  DisclosurePanel,
  DisclosureProps as AriaDisclosureProps,
  Heading,
} from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const useDisclosureGroupStyles = () =>
  tv({
    base: "flex flex-col",
    variants: {
      size: { sm: "gap-2", md: "gap-2.5", lg: "gap-3" },
    },
  });

const useDisclosureStyles = () =>
  tv({
    extend: useVariantAndColorStyles(),
    base: "flex-col !backdrop-blur-none",
    slots: {
      heading: "w-full",
      trigger: "flex w-full items-center outline-none",
      textWrapper: "flex-1 text-start",
      title: "font-bold",
      description: "",
      panel: "w-full !pt-0",
      icon: "transition-transform duration-300",
    },
    variants: {
      size: {
        sm: { base: radiusVariants.sm, trigger: "gap-x-2 p-4 [&_svg]:size-4", title: "text-sm", description: "text-xs", panel: "p-4 text-sm" },
        md: { base: radiusVariants.md, trigger: "gap-x-2.5 p-5 [&_svg]:size-5", title: "text-base", description: "text-sm", panel: "p-5 text-base" },
        lg: { base: radiusVariants.lg, trigger: "gap-x-3 p-6 [&_svg]:size-6", title: "text-lg", description: "text-base", panel: "p-6 text-lg" },
      },
      isExpanded: {
        true: { icon: "rotate-180" },
        false: { panel: "pb-0" },
      },
    },
  });

type DisclosureStylesReturnType = ReturnType<ReturnType<typeof useDisclosureStyles>>;

// props

interface DisclosureGroupProps extends AriaDisclosureGroupProps, VariantProps, ColorProps, SizeProps {
  icon?: ReactNode;
  itemClassNames?: ComponentPropsWithoutRef<typeof Disclosure>["classNames"];
  itemStyles?: ComponentPropsWithoutRef<typeof Disclosure>["styles"];
}

interface DisclosureProps
  extends AriaDisclosureProps,
    ContentProps,
    VariantProps,
    ColorProps,
    SizeProps,
    StyleSlotsToStyleProps<DisclosureStylesReturnType> {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
}

// slots

interface DisclosureGroupSlotsType extends Pick<DisclosureGroupProps, "variant" | "color" | "size" | "icon" | "itemClassNames" | "itemStyles"> {}

const [DisclosureGroupSlotsProvider, useDisclosureGroupSlots] = createSlots<DisclosureGroupSlotsType>();

// component

function _DisclosureGroup(props: DisclosureGroupProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("DisclosureGroup", props, { variant: "soft", color: "default", size: "md" });

  const { variant, color, size, icon, itemClassNames, itemStyles } = globalProps;

  return (
    <DisclosureGroupSlotsProvider value={{ variant, color, size, icon, itemClassNames, itemStyles }}>
      <AriaDisclosureGroup
        ref={ref}
        {...globalProps}
        className={composeRenderProps(props.className, (className) => useDisclosureGroupStyles()({ size, className }))}
      />
    </DisclosureGroupSlotsProvider>
  );
}

const DisclosureGroup = forwardRef(_DisclosureGroup);

function _Disclosure(props: DisclosureProps, ref: ForwardedRef<HTMLDivElement>) {
  const globalProps = useGlobalProps("Disclosure", useDisclosureGroupSlots(props), { variant: "soft", color: "default", size: "md" });

  const { variant, color, size, title, description, startContent, endContent, classNames, styles, icon } = globalProps;

  const styleSlots = useDisclosureStyles()({ size, color });

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <AriaDisclosure
      ref={ref}
      {...globalProps}
      className={composeRenderProps(props.className, (className, { isExpanded, isDisabled, isFocusVisibleWithin }) =>
        styleSlots.base({
          isDisabled,
          variant: isExpanded ? variant : "light",
          isHovered,
          isExpanded,
          isFocusVisible: isFocusVisibleWithin,
          className: twMerge(classNames?.base, className),
        }),
      )}
      style={({ defaultStyle }) => mergeProps(styles?.base, defaultStyle)}
    >
      {composeRenderProps(globalProps.children, (children, { isExpanded }) => (
        <>
          <Heading className={styleSlots.heading({ className: classNames?.heading })} style={styles?.heading}>
            <Button
              slot="trigger"
              onHoverChange={setIsHovered}
              className={styleSlots.trigger({ className: classNames?.trigger })}
              style={styles?.trigger}
            >
              {startContent}

              <div
                className={styleSlots.textWrapper({
                  className: classNames?.textWrapper,
                })}
                style={styles?.textWrapper}
              >
                <div className={styleSlots.title({ className: classNames?.title })} style={styles?.title}>
                  {title}
                </div>
                {description && (
                  <div
                    className={styleSlots.description({
                      className: classNames?.description,
                    })}
                    style={styles?.description}
                  >
                    {description}
                  </div>
                )}
              </div>

              {endContent}

              <div aria-hidden className={styleSlots.icon({ isExpanded, className: classNames?.icon })} style={styles?.icon}>
                {icon ?? <ChevronDown />}
              </div>
            </Button>
          </Heading>
          <DisclosurePanel className={styleSlots.panel({ isExpanded, className: classNames?.panel })} style={styles?.panel}>
            {children}
          </DisclosurePanel>
        </>
      ))}
    </AriaDisclosure>
  );
}

const Disclosure = forwardRef(_Disclosure);

// exports

export { Disclosure, DisclosureGroup };
