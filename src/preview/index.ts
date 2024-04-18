import * as button from "./button";
import * as card from "./card";
import * as checkbox from "./checkbox";
import * as checkboxGroup from "./checkbox-group";
import * as colorField from "./color-field";

const preview: Record<string, Record<string, { code: string; scope?: any }>> = {
  button,
  card,
  checkbox,
  checkboxGroup,
  colorField,
};

export default preview;
