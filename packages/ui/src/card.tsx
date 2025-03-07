"use client";

import { radiusVariants } from "./styles";
import { ChildrenProps, StyleProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";
import React, { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps } from "react-aria";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const cardStyles = tv({
  slots: {
    base: ["border border-default-1000/20 bg-default-0 bg-opacity-75 bg-clip-padding text-default-1000 backdrop-blur-xl", radiusVariants.md],
    header: "p-4",
    body: "p-4",
    footer: "p-4",
    title: "text-xl font-bold",
    description: "text-sm",
    buttons: "flex justify-end gap-x-4",
  },
  variants: {
    hasShadow: { true: "[box-shadow:0_5px_20px_rgba(0,0,0,.1)] dark:[box-shadow:0_5px_20px_rgba(255,255,255,.1)]", false: "shadow-none" },
  },
  defaultVariants: { hasShadow: true },
});

type CardStylesReturnType = ReturnType<typeof cardStyles>;

// props

interface CardProps extends HTMLAttributes<HTMLDivElement>, ChildrenProps, StyleProps, StyleSlotsToStyleProps<CardStylesReturnType> {
  hasShadow?: boolean;
}

// slots

interface CardSlotsType extends StyleSlotsToSlots<CardStylesReturnType> {}

const [CardSlotsProvider, useCardSlots] = createSlots<CardSlotsType>();

// component

function _Card(props: CardProps, ref: ForwardedRef<HTMLDivElement>) {
  const { hasShadow = true, children, className, classNames, style, styles } = props;

  const styleSlots = cardStyles({ hasShadow });

  return (
    <CardSlotsProvider value={{ styleSlots, classNames, styles }}>
      <div ref={ref} className={styleSlots.base({ className: twMerge(classNames?.base, className) })} style={mergeProps(styles?.base, style)}>
        {children}
      </div>
    </CardSlotsProvider>
  );
}

const Card = forwardRef(_Card);

function _CardHeader(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <header
      ref={ref}
      className={styleSlots.header({ className: twMerge(classNames?.header, className) })}
      style={mergeProps(styles?.header, style)}
      {...restProps}
    />
  );
}

const CardHeader = forwardRef(_CardHeader);

function _CardBody(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <section
      ref={ref}
      className={styleSlots.body({ className: twMerge(classNames?.body, className) })}
      style={mergeProps(styles?.body, style)}
      {...restProps}
    />
  );
}

const CardBody = forwardRef(_CardBody);

function _CardFooter(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <footer
      ref={ref}
      className={styleSlots.footer({ className: twMerge(classNames?.footer, className) })}
      style={mergeProps(styles?.footer, style)}
      {...restProps}
    />
  );
}

const CardFooter = forwardRef(_CardFooter);

function _CardTitle(props: HTMLAttributes<HTMLHeadingElement>, ref: ForwardedRef<HTMLHeadingElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <h3
      ref={ref}
      className={styleSlots.title({ className: twMerge(classNames?.title, className) })}
      style={mergeProps(styles?.title, style)}
      {...restProps}
    />
  );
}

const CardTitle = forwardRef(_CardTitle);

function _CardDescription(props: HTMLAttributes<HTMLParagraphElement>, ref: ForwardedRef<HTMLParagraphElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <p
      ref={ref}
      className={styleSlots.description({ className: twMerge(classNames?.description, className) })}
      style={mergeProps(styles?.description, style)}
      {...restProps}
    />
  );
}

const CardDescription = forwardRef(_CardDescription);

function _CardButtons(props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
  const { styleSlots, className, classNames, style, styles, ...restProps } = useCardSlots(props);

  return (
    <div
      ref={ref}
      className={styleSlots.buttons({ className: twMerge(classNames?.buttons, className) })}
      style={mergeProps(styles?.buttons, style)}
      {...restProps}
    />
  );
}

const CardButtons = forwardRef(_CardButtons);

// exports

export { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription, CardButtons, cardStyles };
