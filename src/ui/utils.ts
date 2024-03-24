import { Context, createContext, Provider, useContext } from "react";
import { mergeProps } from "react-aria";

type CreateSlotsReturn<T> = [Provider<T>, <K extends object>(props?: K) => T & K];

export function createSlots<SlotsType extends object>(): CreateSlotsReturn<SlotsType> {
  const Slots = createContext<SlotsType | undefined>(undefined) as Context<SlotsType>;

  function useSlots<T extends object>(props?: T) {
    return mergeProps(useContext(Slots), props) as SlotsType & T;
  }

  return [Slots.Provider, useSlots];
}
