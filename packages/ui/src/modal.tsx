"use client";

import { Button } from "./button";
import { cardStyles } from "./card";
import { SizeProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";
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
    base: "relative w-full",
    header: "pr-16",
    dialog: "relative flex flex-col outline-none",
    backdrop: "fixed inset-0 z-[999] grid place-items-center px-4 py-16",
    closeButton: "absolute right-2 top-2",
  },
  variants: {
    size: { sm: "max-w-lg", md: "max-w-2xl", lg: "max-w-4xl" },
    backdrop: {
      blur: { backdrop: "bg-default-0/50 backdrop-blur-lg" },
      opaque: { backdrop: "bg-default-0/75" },
      transparent: { backdrop: "bg-transparent" },
    },
    insideScroll: {
      true: { dialog: "max-h-[calc(100vh-8rem)]", body: "overflow-y-auto" },
      false: { backdrop: "overflow-auto" },
    },
  },
});

type ModalStylesReturnType = ReturnType<typeof modalStyles>;

// props

interface ModalProps extends ModalOverlayProps, SizeProps, StyleSlotsToStyleProps<ModalStylesReturnType> {
  backdrop?: "blur" | "opaque" | "transparent";
  insideScroll?: boolean;
  hideCloseButton?: boolean;
}

// slots

interface ModalSlotsType extends StyleSlotsToSlots<ModalStylesReturnType> {}

const [ModalSlotsProvider, useModalSlots] = createSlots<Record<"headerId" | "bodyId", string> & ModalSlotsType>();

// component

function _Modal(props: ModalProps, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", backdrop = "blur", insideScroll = false, hideCloseButton = false, children, classNames, styles, ...restProps } = props;

  const headerId = useId();
  const bodyId = useId();

  const styleSlots = modalStyles({ size, backdrop, insideScroll });

  return (
    <ModalSlotsProvider value={{ headerId, bodyId, styleSlots, classNames, styles }}>
      <ModalOverlay isDismissable {...restProps} className={styleSlots.backdrop({ className: classNames?.backdrop })} style={styles?.backdrop}>
        {composeRenderProps(props.children, (children, { state }) => (
          <AriaModal
            ref={ref}
            {...restProps}
            className={composeRenderProps(props.className, (className) => styleSlots.base({ className: twMerge(classNames?.base, className) }))}
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
                isIconOnly
                variant="soft"
                radius="full"
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

function _ModalHeading<T extends object>(props: HTMLAttributes<HTMLHeadingElement>, ref: ForwardedRef<HTMLHeadingElement>) {
  const { headerId, bodyId, styleSlots, className, classNames, style, styles, ...restProps } = useModalSlots(props);

  return (
    <h3
      ref={ref}
      className={styleSlots.heading({ className: twMerge(classNames?.heading, className) })}
      style={mergeProps(styles?.heading, style)}
      {...restProps}
    />
  );
}

const ModalHeading = forwardRef(_ModalHeading);

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

export { Modal, ModalHeader, ModalBody, ModalFooter, ModalHeading, ModalButtons, DialogTrigger as ModalTrigger };
