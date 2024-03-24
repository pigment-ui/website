import { ForwardedRef, forwardRef } from "react";
import { Dialog as AriaDialog, DialogProps } from "react-aria-components";
import { tv } from "tailwind-variants";

// styles

const dialogStyles = tv({
  base: "outline-none",
});

// props

interface PigmentDialogProps extends DialogProps {}

// component

function _Dialog(props: PigmentDialogProps, ref: ForwardedRef<HTMLElement>) {
  const { children, className, style, ...restProps } = props;

  return (
    <AriaDialog ref={ref} {...restProps} className={dialogStyles({ className })} style={style}>
      {children}
    </AriaDialog>
  );
}

const Dialog = forwardRef(_Dialog);

// exports

export { Dialog };
export type { PigmentDialogProps };
