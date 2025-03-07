// // Reuse the Button from your component library. See below for details.
// import { Button } from "./button";
// import { variantColorStyles } from "./styles";
// import { ColorExtendedProps, RadiusProps, SizeProps, StyleSlotsToSlots, Variants } from "./types";
// import { createSlots } from "./utils";
// import type { AriaToastProps, AriaToastRegionProps } from "@react-aria/toast";
// import { useToast, useToastRegion } from "@react-aria/toast";
// import type { ToastState } from "@react-stately/toast";
// import { ToastQueue, useToastQueue } from "@react-stately/toast";
// import { CircleAlertIcon, CircleCheckIcon, CircleXIcon, InfoIcon, XIcon } from "lucide-react";
// import React, { ReactNode, useRef } from "react";
// import { createPortal } from "react-dom";
// import { tv } from "tailwind-variants";
//
// // styles
//
// const toastStyles = tv({
//   extend: variantColorStyles,
//   slots: {
//     base: "",
//     wrapper: "",
//     title: "",
//     description: "",
//     icon: "",
//     closeButton: "",
//   },
// });
//
// type ToastStylesReturnType = ReturnType<typeof toastStyles>;
//
// // props
//
// interface MyToastProps extends ColorExtendedProps, SizeProps, RadiusProps, StyleSlotsToSlots<ToastStylesReturnType> {
//   title?: string;
//   description?: string;
//   hideIcon?: boolean;
//   placement?: "bottom" | "bottom left" | "bottom right" | "top" | "top left" | "top right";
// }
//
// // slots
//
// interface ToastSlotsType
//   extends Pick<
//     MyToastProps,
//     "variant" | "color" | "size" | "radius" | "title" | "description" | "hideIcon" | "placement" | "styleSlots" | "classNames" | "styles"
//   > {}
//
// const [ToastSlotsProvider, useToastSlots] = createSlots<ToastSlotsType>();
//
// // component
//
// // Create a global toast queue.
// export const toastQueue = new ToastQueue<ReactNode>({
//   maxVisibleToasts: 5,
// });
//
// export function GlobalToastRegion<T extends ReactNode>(props) {
//   // Subscribe to it.
//   let state = useToastQueue<T>(toastQueue);
//
//   // Render toast region.
//   return state.visibleToasts.length > 0 ? createPortal(<ToastRegion {...props} state={state} />, document.body) : null;
// }
//
// interface ToastRegionProps<T> extends AriaToastRegionProps {
//   state: ToastState<T>;
// }
//
// function ToastRegion<T extends ReactNode>({ state, ...props }: ToastRegionProps<T>) {
//   let ref = useRef(null);
//   let { regionProps } = useToastRegion(props, state, ref);
//
//   return (
//     <div {...regionProps} ref={ref} className="fixed right-4 top-4 z-[999] flex flex-col gap-4">
//       {state.visibleToasts.map((toast) => (
//         <Toast key={toast.key} toast={toast} state={state} />
//       ))}
//     </div>
//   );
// }
//
// interface ToastProps<T> extends AriaToastProps<T> {
//   state: ToastState<T>;
// }
//
// function Toast<T extends ReactNode>({ state, ...props }: ToastProps<T>) {
//   const { variant, color, title, description, size, radius, hideIcon, placement, styleSlots, classNames, styles } = useToastSlots();
//
//   let ref = useRef(null);
//   let { toastProps, contentProps, titleProps, closeButtonProps, descriptionProps } = useToast(props, state, ref);
//
//   return (
//     <div {...toastProps} ref={ref} className="flex items-center gap-4 rounded-xl bg-primary-500 p-4">
//       {!hideIcon && (
//         <div className={styleSlots.icon({ className: classNames?.icon })} style={styles?.icon}>
//           {color === "success" ? <CircleCheckIcon /> : color === "warning" ? <CircleAlertIcon /> : color === "error" ? <CircleXIcon /> : <InfoIcon />}
//         </div>
//       )}
//       <div {...contentProps}>
//         <div {...titleProps}>{props.toast.content}</div>
//       </div>
//       <Button
//         {...closeButtonProps}
//         aria-label="Modal close button"
//         isFit
//         variant="light"
//         radius="full"
//         size={size}
//         color={variant === "solid" ? "inverted" : color}
//         className={styleSlots.closeButton({ className: classNames?.closeButton })}
//         style={styles?.closeButton}
//       >
//         <XIcon />
//       </Button>
//     </div>
//   );
// }
