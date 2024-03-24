import { ForwardedRef, forwardRef } from "react";
import { Separator as AriaSeparator, SeparatorProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { SizeProps } from "./types";

// styles

const separatorStyles = tv({
  base: "bg-default-200 border-none rounded-full",
  variants: {
    orientation: {
      horizontal: "w-full",
      vertical: "h-full",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      className: "h-px",
    },
    {
      orientation: "horizontal",
      size: "md",
      className: "h-0.5",
    },
    {
      orientation: "horizontal",
      size: "lg",
      className: "h-1",
    },
    {
      orientation: "vertical",
      size: "sm",
      className: "w-px",
    },
    {
      orientation: "vertical",
      size: "md",
      className: "w-0.5",
    },
    {
      orientation: "vertical",
      size: "lg",
      className: "w-1",
    },
  ],
});

// props

interface PigmentSeparatorProps extends SeparatorProps, SizeProps {}

// component

function _Separator(props: PigmentSeparatorProps, ref: ForwardedRef<HTMLElement>) {
  const { orientation = "horizontal", size = "sm", className, style, ...restProps } = props;

  return (
    <AriaSeparator ref={ref} {...restProps} orientation={orientation} className={separatorStyles({ orientation, size, className })} style={style} />
  );
}

const Separator = forwardRef(_Separator);

// exports

export { Separator };
export type { PigmentSeparatorProps };
