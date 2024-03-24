import { Slot } from "@radix-ui/react-slot";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { AsChildProps, ChildrenProps, StyleProps, StylesSlotsToSlots, StylesSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

// styles

const cardStyles = tv({
  slots: {
    base: "bg-default-0 text-default-1000 border border-default-1000/10 bg-clip-padding backdrop-blur-xl bg-opacity-75 overflow-hidden rounded-xl",
    header: "p-4",
    body: "p-4",
    footer: "p-4",
  },
});

type CardStylesReturnType = ReturnType<typeof cardStyles>;

// props

interface PigmentCardProps extends AsChildProps, ChildrenProps, StyleProps, StylesSlotsToStyleProps<CardStylesReturnType> {}

interface PigmentCardItemProps extends HTMLAttributes<HTMLElement> {}

// slots

interface CardSlotsType extends StylesSlotsToSlots<CardStylesReturnType> {}

const [CardSlotsProvider, useCardSlots] = createSlots<CardSlotsType>();

// component

function _Card(props: PigmentCardProps, ref: ForwardedRef<HTMLDivElement>) {
  const { asChild, children, className, classNames, style, styles } = props;

  const stylesSlots = cardStyles();

  const Component = asChild ? Slot : "div";

  return (
    <CardSlotsProvider value={{ stylesSlots, classNames, styles }}>
      <Component ref={ref} className={stylesSlots.base({ className: twMerge(classNames?.base, className) })} style={mergeProps(styles?.base, style)}>
        {children}
      </Component>
    </CardSlotsProvider>
  );
}

const Card = forwardRef(_Card);

function _CardHeader(props: PigmentCardItemProps, ref: ForwardedRef<HTMLElement>) {
  const { children, stylesSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <header
      ref={ref}
      {...restProps}
      className={stylesSlots.header({ className: twMerge(classNames?.header, className) })}
      style={mergeProps(styles?.header, style)}
    >
      {children}
    </header>
  );
}

const CardHeader = forwardRef(_CardHeader);

function _CardBody(props: PigmentCardItemProps, ref: ForwardedRef<HTMLElement>) {
  const { children, stylesSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <section
      ref={ref}
      {...restProps}
      className={stylesSlots.body({ className: twMerge(classNames?.body, className) })}
      style={mergeProps(styles?.body, style)}
    >
      {children}
    </section>
  );
}

const CardBody = forwardRef(_CardBody);

function _CardFooter(props: PigmentCardItemProps, ref: ForwardedRef<HTMLElement>) {
  const { children, stylesSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <footer
      ref={ref}
      {...restProps}
      className={stylesSlots.footer({ className: twMerge(classNames?.footer, className) })}
      style={mergeProps(styles?.footer, style)}
    >
      {children}
    </footer>
  );
}

const CardFooter = forwardRef(_CardFooter);

// exports

export { Card, CardHeader, CardBody, CardFooter };
export type { PigmentCardProps };
