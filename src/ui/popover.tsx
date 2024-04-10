"use client";

import { ForwardedRef, forwardRef } from "react";
import { composeRenderProps, Popover as AriaPopover, PopoverProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { cardStyles } from "./card";
import { Dialog, PigmentDialogProps } from "./dialog";

// styles

const popoverStyles = tv({
  base: cardStyles().base({ className: "p-4" }),
});

// props

interface PigmentPopoverProps extends Omit<PopoverProps, "children">, Pick<PigmentDialogProps, "children"> {}

// component

function _Popover(props: PigmentPopoverProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children } = props;

  return (
    <AriaPopover ref={ref} {...props} className={composeRenderProps(props.className, (className) => popoverStyles({ className }))}>
      <Dialog>{children}</Dialog>
    </AriaPopover>
  );
}

const Popover = forwardRef(_Popover);

// exports

export { Popover };
export type { PigmentPopoverProps };
