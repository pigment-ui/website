"use client";

import { useObjectRef, useResizeObserver } from "@react-aria/utils";
import { Context, createContext, ForwardedRef, Provider, RefObject, useContext, useState } from "react";
import { mergeProps } from "react-aria";

type CreateSlotsReturn<T> = [Provider<T>, <K extends object>(props?: K) => T & K];

export function createSlots<SlotsType extends object>(): CreateSlotsReturn<SlotsType> {
  const Slots = createContext<SlotsType | undefined>(undefined) as Context<SlotsType>;

  function useSlots<T extends object>(props?: T) {
    return mergeProps(useContext(Slots), props) as SlotsType & T;
  }

  return [Slots.Provider, useSlots];
}

export function useObserveElementWidth<T extends HTMLElement>(forwardedRef?: ForwardedRef<T>): [number, RefObject<T>] {
  const ref = useObjectRef(forwardedRef);
  const [width, setWidth] = useState(0);

  useResizeObserver({ ref, onResize: () => (ref.current ? setWidth(ref.current.clientWidth) : undefined) });

  return [width, ref];
}
