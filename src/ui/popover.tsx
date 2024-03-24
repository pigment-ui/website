"use client";

import { ForwardedRef, forwardRef } from "react";
import { Popover as AriaPopover, PopoverProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { FilterProps } from "./types";

import { Card } from "./card";
import { Dialog, PigmentDialogProps } from "./dialog";

// styles

const popoverStyles = tv({
  base: "p-4",
});

// props

interface PigmentPopoverProps extends Omit<FilterProps<PopoverProps>, "children">, Pick<PigmentDialogProps, "children"> {}

// component

function _Popover(props: PigmentPopoverProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, className, style, ...restProps } = props;

  return (
    <Card asChild className={popoverStyles({ className })} style={style}>
      <AriaPopover ref={ref} offset={8} {...restProps}>
        <Dialog>{children}</Dialog>
      </AriaPopover>
    </Card>
  );
}

const Popover = forwardRef(_Popover);

// exports

export { Popover };
export type { PigmentPopoverProps };
