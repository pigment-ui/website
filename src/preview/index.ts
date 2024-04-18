import * as button from "./button";
import * as card from "./card";
import * as checkbox from "./checkbox";
import * as checkboxGroup from "./checkbox-group";
import * as colorField from "./color-field";
import * as dateField from "./date-field";
import * as numberField from "./number-field";
import * as searchField from "./search-field";
import * as separator from "./separator";
import * as skeleton from "./skeleton";
import * as spinner from "./spinner";
import * as textArea from "./text-area";
import * as textField from "./text-field";
import * as timeField from "./time-field";
import * as tooltip from "./tooltip";

const preview: Record<string, Record<string, { code: string; scope?: any }>> = {
  button,
  card,
  checkbox,
  checkboxGroup,
  colorField,
  dateField,
  numberField,
  searchField,
  separator,
  skeleton,
  spinner,
  textArea,
  textField,
  timeField,
  tooltip,
};

export default preview;
