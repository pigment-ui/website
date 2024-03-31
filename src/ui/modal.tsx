"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { ForwardedRef, forwardRef, HTMLAttributes } from "react";
import { mergeProps, useId } from "react-aria";
import { Modal as AriaModal, ModalOverlay, ModalOverlayProps } from "react-aria-components";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

import { ChildrenProps, FilterProps, SizeProps, StyleProps, StyleSlotsToSlots, StyleSlotsToStyleProps } from "./types";
import { createSlots } from "./utils";

import { Button } from "./button";
import { Card, CardBody, CardButtons, CardFooter, CardHeader, CardHeading } from "./card";
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
    StyleSlotsToStyleProps<ModalStylesReturnType> {}

interface PigmentModalSectionProps extends ChildrenProps, StyleProps {}

// slots

interface ModalSlotsType extends StyleSlotsToSlots<ModalStylesReturnType> {}

const [ModalSlotsProvider, useModalSlots] = createSlots<Record<"headerId" | "bodyId", string> & ModalSlotsType>();

// component

function _Modal(props: PigmentModalProps, ref: ForwardedRef<HTMLDivElement>) {
  const { size = "md", children, className, classNames, style, styles, ...restProps } = props;

  const headerId = useId();
  const bodyId = useId();

  const styleSlots = modalStyles({ size });

  return (
    <ModalSlotsProvider value={{ headerId, bodyId, styleSlots, classNames, styles }}>
      <ModalOverlay {...restProps} className={styleSlots.backdrop({ className: classNames?.backdrop })} style={styles?.backdrop}>
        {({ state }) => (
          <Card asChild className={styleSlots.base({ className: twMerge(classNames?.base, className) })} style={mergeProps(styles?.base, style)}>
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
                className={styleSlots.closeButton({ className: classNames?.closeButton })}
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

function _ModalHeader(props: PigmentModalSectionProps, ref: ForwardedRef<HTMLElement>) {
  const { headerId, children, styleSlots, className, classNames, style, styles } = useModalSlots(props);

  return (
    <CardHeader
      ref={ref}
      id={headerId}
      className={styleSlots.header({ className: twMerge(classNames?.header, className) })}
      style={mergeProps(styles?.header, style)}
    >
      {children}
    </CardHeader>
  );
}

const ModalHeader = forwardRef(_ModalHeader);

function _ModalBody(props: PigmentModalSectionProps, ref: ForwardedRef<HTMLElement>) {
  const { bodyId, children, styleSlots, className, classNames, style, styles } = useModalSlots(props);

  return (
    <CardBody
      ref={ref}
      id={bodyId}
      className={styleSlots.body({ className: twMerge(classNames?.body, className) })}
      style={mergeProps(styles?.body, style)}
    >
      {children}
    </CardBody>
  );
}

const ModalBody = forwardRef(_ModalBody);

function _ModalFooter(props: PigmentModalSectionProps, ref: ForwardedRef<HTMLElement>) {
  const { children, styleSlots, className, classNames, style, styles } = useModalSlots(props);

  return (
    <CardFooter
      ref={ref}
      className={styleSlots.footer({ className: twMerge(classNames?.footer, className) })}
      style={mergeProps(styles?.footer, style)}
    >
      {children}
    </CardFooter>
  );
}

const ModalFooter = forwardRef(_ModalFooter);

function _ModalHeading<T extends object>(props: HTMLAttributes<HTMLHeadingElement>, ref: ForwardedRef<HTMLHeadingElement>) {
  return <CardHeading ref={ref} {...props} />;
}

const ModalHeading = forwardRef(_ModalHeading);

function _ModalButtons<T extends object>(props: HTMLAttributes<HTMLDivElement>, ref: ForwardedRef<HTMLDivElement>) {
  return <CardButtons ref={ref} {...props} />;
}

const ModalButtons = forwardRef(_ModalButtons);

// exports

export { Modal, ModalHeader, ModalBody, ModalFooter, ModalHeading, ModalButtons };
export type { PigmentModalProps };
