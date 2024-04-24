"use client";

import { ForwardedRef, forwardRef } from "react";
import { Dialog as AriaDialog, DialogProps as AriaDialogProps } from "react-aria-components";
import { tv } from "tailwind-variants";

// styles

const dialogStyles = tv({
  base: "outline-none",
});

// props

interface DialogProps extends AriaDialogProps {}

// component

function _Dialog(props: DialogProps, ref: ForwardedRef<HTMLElement>) {
  return <AriaDialog ref={ref} {...props} className={dialogStyles({ className: props.className })} />;
}

const Dialog = forwardRef(_Dialog);

// exports

export { Dialog };
export type { DialogProps };
