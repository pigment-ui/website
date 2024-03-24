"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef } from "react";
import { mergeProps, useId } from "react-aria";
import { Modal as AriaModal, ModalOverlay, ModalOverlayProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { ChildrenProps, FilterProps, SizeProps, StyleProps, StylesSlotsToSlots, StylesSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Button } from "./button";
import { Card, CardBody, CardFooter, CardHeader } from "./card";
import { Dialog, PigmentDialogProps } from "./dialog";

// styles

const modalStyles = tv({
  slots: {
    base: "relative w-full",
    header: "",
    body: "",
    footer: "",
    backdrop: "fixed inset-0 bg-default-0/50 grid place-items-center p-4 backdrop-blur-lg z-[999]",
    closeButton: "absolute top-2 right-2",
  },
  variants: {
    size: {
      sm: "max-w-lg",
      md: "max-w-2xl",
      lg: "max-w-4xl",
    },
  },
});

type ModalStylesReturnType = ReturnType<typeof modalStyles>;

// props

interface PigmentModalProps
  extends Omit<FilterProps<ModalOverlayProps>, "children">,
    Pick<PigmentDialogProps, "children">,
    SizeProps,
    StylesSlotsToStyleProps<ModalStylesReturnType> {}

interface PigmentModalItemProps extends ChildrenProps, StyleProps {}

// slots

interface ModalSlotsType extends StylesSlotsToSlots<ModalStylesReturnType> {}

const [ModalSlotsProvider, useModalSlots] = createSlots<Record<"headerId" | "bodyId", string> & ModalSlotsType>();

// component

function _Modal(props: PigmentModalProps, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", children, className, classNames, style, styles, ...restProps } = props;

  const headerId = useId();
  const bodyId = useId();

  const stylesSlots = modalStyles({ size });

  return (
    <ModalSlotsProvider value={{ headerId, bodyId, stylesSlots, classNames, styles }}>
      <ModalOverlay {...restProps} className={stylesSlots.backdrop({ className: classNames?.backdrop })} style={styles?.backdrop}>
        {({ state }) => (
          <Card asChild className={stylesSlots.base({ className: twMerge(classNames?.base, className) })} style={mergeProps(styles?.base, style)}>
            <AriaModal ref={ref} {...restProps}>
              <Dialog aria-labelledby={headerId} aria-describedby={bodyId}>
                {children}
              </Dialog>
              <Button
                aria-label="Modal close button"
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => state.close()}
                className={stylesSlots.closeButton({ className: classNames?.closeButton })}
                style={styles?.closeButton}
              >
                <Cross2Icon />
              </Button>
            </AriaModal>
          </Card>
        )}
      </ModalOverlay>
    </ModalSlotsProvider>
  );
}

const Modal = forwardRef(_Modal);

function _ModalHeader(props: PigmentModalItemProps, ref: ForwardedRef<HTMLElement>) {
  const { headerId, children, stylesSlots, className, classNames, style, styles } = useModalSlots(props);

  return (
    <CardHeader
      ref={ref}
      id={headerId}
      className={stylesSlots.header({ className: twMerge(classNames?.header, className) })}
      style={mergeProps(styles?.header, style)}
    >
      {children}
    </CardHeader>
  );
}

const ModalHeader = forwardRef(_ModalHeader);

function _ModalBody(props: PigmentModalItemProps, ref: ForwardedRef<HTMLElement>) {
  const { bodyId, children, stylesSlots, className, classNames, style, styles } = useModalSlots(props);

  return (
    <CardBody
      ref={ref}
      id={bodyId}
      className={stylesSlots.body({ className: twMerge(classNames?.body, className) })}
      style={mergeProps(styles?.body, style)}
    >
      {children}
    </CardBody>
  );
}

const ModalBody = forwardRef(_ModalBody);

function _ModalFooter(props: PigmentModalItemProps, ref: ForwardedRef<HTMLElement>) {
  const { children, stylesSlots, className, classNames, style, styles } = useModalSlots(props);

  return (
    <CardFooter
      ref={ref}
      className={stylesSlots.footer({ className: twMerge(classNames?.footer, className) })}
      style={mergeProps(styles?.footer, style)}
    >
      {children}
    </CardFooter>
  );
}

const ModalFooter = forwardRef(_ModalFooter);

// exports

export { Modal, ModalHeader, ModalBody, ModalFooter };
export type { PigmentModalProps };
