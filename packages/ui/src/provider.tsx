import { ChildrenProps, ColorProps, RadiusProps, SizeProps, VariantProps } from "./types";
import { createSlots } from "./utils";

type PigmentSlotsType = Record<
  "alert" | "disclosure" | "file-trigger-dropzone" | "list-box" | "menu" | "progress-bar",
  VariantProps & ColorProps & SizeProps
> &
  Record<"badge" | "button" | "checkbox" | "chip" | "field" | "pagination", VariantProps & ColorProps & SizeProps & RadiusProps> &
  Record<"modal", SizeProps>;

const [PigmentSlots, usePigmentSlots] = createSlots<PigmentSlotsType>();

function PigmentProvider({ color = "default", variant = "solid", variant2 = "soft", children }: PigmentSlotsType & ChildrenProps) {
  return <>{children}</>;
}

export { PigmentProvider, usePigmentSlots };
