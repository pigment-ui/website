import { Context, createContext, Provider, RefObject, useContext, useEffect, useRef, useState } from "react";
import { mergeProps } from "react-aria";

type CreateSlotsReturn<T> = [Provider<T>, <K extends object>(props?: K) => T & K];

export function createSlots<SlotsType extends object>(): CreateSlotsReturn<SlotsType> {
  const Slots = createContext<SlotsType | undefined>(undefined) as Context<SlotsType>;

  function useSlots<T extends object>(props?: T) {
    return mergeProps(useContext(Slots), props) as SlotsType & T;
  }

  return [Slots.Provider, useSlots];
}

export function useObserveElementWidth<T extends HTMLElement>(): { width: number; ref: RefObject<T> } {
  const [width, setWidth] = useState(0);
  const ref = useRef<T>(null);

  useEffect(() => {
    let observerRefValue: T | null = null;

    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });

    if (ref.current) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }

    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
    };
  }, []);

  return { width, ref };
}
