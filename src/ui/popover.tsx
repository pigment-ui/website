"use client";

import { ForwardedRef, forwardRef } from "react";
import { Popover as AriaPopover, PopoverProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { FilterProps } from "./types";

import { Card } from "./card";

// styles

const popoverStyles = tv({
  base: "p-4",
});

// props

interface PigmentPopoverProps extends FilterProps<PopoverProps> {}

// component

function _Popover(props: PigmentPopoverProps, ref: ForwardedRef<HTMLDivElement>) {
  const { children, className, style } = props;

  return (
    <Card asChild className={popoverStyles({ className })} style={style}>
      <AriaPopover ref={ref} offset={8} {...props} className="" style={{}}>
        {children}
      </AriaPopover>
    </Card>
  );
}

const Popover = forwardRef(_Popover);

// exports

export { Popover };
export type { PigmentPopoverProps };
