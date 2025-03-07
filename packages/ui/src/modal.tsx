"use client";

import { Button } from "./button";
import { cardStyles } from "./card";
import { SizeProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";
import { PlacementAxis } from "@react-types/overlays";
import { XIcon } from "lucide-react";
import React, { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps, useId } from "react-aria";
import { composeRenderProps, Dialog, DialogTrigger, Modal as AriaModal, ModalOverlay, ModalOverlayProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

// styles

const modalStyles = tv({
  extend: cardStyles,
  slots: {
    base: "relative duration-300",
    header: "pr-16",
    body: "",
    dialog: "relative flex flex-col outline-none",
    backdrop: "fixed inset-0 z-[999] grid duration-300",
    closeButton: "absolute right-2 top-2",
  },
  variants: {
    placement: {
      top: { base: "rounded-t-none", backdrop: "items-start pb-16" },
      bottom: { base: "rounded-b-none", backdrop: "items-end pt-16" },
      left: { base: "rounded-l-none", backdrop: "justify-start pr-4" },
      right: { base: "rounded-r-none", backdrop: "justify-end pl-4" },
      center: { base: "", backdrop: "place-items-center px-4 py-16" },
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
    backdrop: {
      blur: { backdrop: "bg-default-0/50 backdrop-blur-lg" },
      opaque: { backdrop: "bg-default-0/75" },
      transparent: { backdrop: "bg-transparent" },
    },
    insideScroll: {
      true: { body: "overflow-y-auto" },
      false: { backdrop: "overflow-auto" },
    },
  },
  compoundVariants: [
    { size: "sm", placement: ["left", "right", "center"], className: { base: "max-w-[600px]" } },
    { size: "md", placement: ["left", "right", "center"], className: { base: "max-w-[900px]" } },
    { size: "lg", placement: ["left", "right", "center"], className: { base: "max-w-[1200px]" } },
    { insideScroll: true, placement: ["left", "right"], className: { base: "max-h-screen" } },
    { insideScroll: true, placement: ["top", "bottom"], className: { base: "max-h-[calc(100vh-4rem)]" } },
    { insideScroll: true, placement: ["center"], className: { base: "max-h-[calc(100vh-8rem)]" } },
  ],
});

type ModalStylesReturnType = ReturnType<typeof modalStyles>;

// props

interface ModalProps extends ModalOverlayProps, SizeProps, StyleSlotsToStyleProps<ModalStylesReturnType> {
  backdrop?: "blur" | "opaque" | "transparent";
  insideScroll?: boolean;
  hideCloseButton?: boolean;
  placement?: PlacementAxis;
}

// slots

interface ModalSlotsType extends StyleSlotsToSlots<ModalStylesReturnType> {}

const [ModalSlotsProvider, useModalSlots] = createSlots<Record<"headerId" | "bodyId", string> & ModalSlotsType>();

// component

function _Modal(props: ModalProps, ref: ForwardedRef<HTMLDivElement>) {
  const {
    placement = "center",
    size = "md",
    backdrop = "blur",
    insideScroll = true,
    hideCloseButton = false,
    children,
    classNames,
    styles,
    ...restProps
  } = props;

  const headerId = useId();
  const bodyId = useId();

  const styleSlots = modalStyles({ placement, size, backdrop, insideScroll });

  return (
    <ModalSlotsProvider value={{ headerId, bodyId, styleSlots, classNames, styles }}>
      <ModalOverlay
        isDismissable
        {...restProps}
        className={({ isEntering, isExiting }) =>
          styleSlots.backdrop({ className: twMerge(isEntering && "animate-in fade-in", isExiting && "animate-out fade-out", classNames?.backdrop) })
        }
        style={styles?.backdrop}
      >
        {composeRenderProps(props.children, (children, { state, isEntering, isExiting }) => (
          <AriaModal
            ref={ref}
            {...restProps}
            className={composeRenderProps(props.className, (className) =>
              styleSlots.base({
                className: twMerge(
                  isEntering && "animate-in fade-in",
                  isExiting && "animate-out fade-out",
                  {
                    left: isEntering ? "slide-in-from-left" : isExiting ? "slide-out-to-left" : "",
                    right: isEntering ? "slide-in-from-right" : isExiting ? "slide-out-to-right" : "",
                    top: isEntering ? "slide-in-from-top" : isExiting ? "slide-out-to-top" : "",
                    bottom: isEntering ? "slide-in-from-bottom" : isExiting ? "slide-out-to-bottom" : "",
                    center: isEntering ? "zoom-in-95" : isExiting ? "zoom-out-95" : "",
                  }[placement],
                  classNames?.base,
                  className,
                ),
              }),
            )}
            style={composeRenderProps(props.style, (style) => mergeProps(styles?.base, style))}
          >
            <Dialog
              aria-labelledby={headerId}
              aria-describedby={bodyId}
              className={styleSlots.dialog({ className: classNames?.dialog })}
              style={styles?.dialog}
            >
              {children}
            </Dialog>
            {!hideCloseButton && (
              <Button
                aria-label="Modal close button"
                isFit
                variant="soft"
                radius="full"
                size="sm"
                onPress={() => state.close()}
                className={styleSlots.closeButton({ className: classNames?.closeButton })}
                style={styles?.closeButton}
              >
                <XIcon />
              </Button>
            )}
          </AriaModal>
        ))}
      </ModalOverlay>
    </ModalSlotsProvider>
  );
}

const Modal = forwardRef(_Modal);

function _ModalHeader(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { headerId, bodyId, styleSlots, className, classNames, style, styles, ...restProps } = useModalSlots(props);

  return (
    <header
      ref={ref}
      id={headerId}
      className={styleSlots.header({ className: twMerge(classNames?.header, className) })}
      style={mergeProps(styles?.header, style)}
      {...restProps}
    />
  );
}

const ModalHeader = forwardRef(_ModalHeader);

function _ModalBody(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { headerId, bodyId, styleSlots, className, classNames, style, styles, ...restProps } = useModalSlots(props);

  return (
    <section
      ref={ref}
      id={bodyId}
      className={styleSlots.body({ className: twMerge(classNames?.body, className) })}
      style={mergeProps(styles?.body, style)}
      {...restProps}
    />
  );
}

const ModalBody = forwardRef(_ModalBody);

function _ModalFooter(props: HTMLAttributes<HTMLElement>, ref: ForwardedRef<HTMLElement>) {
  const { headerId, bodyId, styleSlots, className, classNames, style, styles, ...restProps } = useModalSlots(props);

  return (
    <footer
      ref={ref}
      className={styleSlots.footer({ className: twMerge(classNames?.footer, className) })}
      style={mergeProps(styles?.footer, style)}
      {...restProps}
    />
  );
}

const ModalFooter = forwardRef(_ModalFooter);

function _ModalTitle<T extends object>(props: HTMLAttributes<HTMLHeadingElement>, ref: ForwardedRef<HTMLHeadingElement>) {
  const { headerId, bodyId, styleSlots, className, classNames, style, styles, ...restProps } = useModalSlots(props);

  return (
    <h3
      ref={ref}
      className={styleSlots.title({ className: twMerge(classNames?.title, className) })}
      style={mergeProps(styles?.title, style)}
      {...restProps}
    />
  );
}

const ModalTitle = forwardRef(_ModalTitle);

function _ModalSubtitle<T extends object>(props: HTMLAttributes<HTMLParagraphElement>, ref: ForwardedRef<HTMLParagraphElement>) {
  const { headerId, bodyId, styleSlots, className, classNames, style, styles, ...restProps } = useModalSlots(props);

  return (
    <p
      ref={ref}
      className={styleSlots.title({ className: twMerge(classNames?.subtitle, className) })}
      style={mergeProps(styles?.subtitle, style)}
      {...restProps}
    />
  );
}

const ModalSubtitle = forwardRef(_ModalSubtitle);

function _ModalButtons<T extends object>(props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
  const { headerId, bodyId, styleSlots, className, classNames, style, styles, ...restProps } = useModalSlots(props);

  return (
    <div
      ref={ref}
      className={styleSlots.buttons({ className: twMerge(classNames?.buttons, className) })}
      style={mergeProps(styles?.buttons, style)}
      {...restProps}
    />
  );
}

const ModalButtons = forwardRef(_ModalButtons);

// exports

export { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, ModalSubtitle, ModalButtons, DialogTrigger as ModalTrigger };
