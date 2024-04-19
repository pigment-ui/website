import * as button from "./button";
import * as card from "./card";
import * as checkbox from "./checkbox";
import * as checkboxGroup from "./checkbox-group";
import * as colorField from "./color-field";
import * as comboBox from "./combo-box";
import * as dateField from "./date-field";
import * as listBox from "./list-box";
import * as menu from "./menu";
import * as modal from "./modal";
import * as numberField from "./number-field";
import * as popover from "./popover";
import * as radioGroup from "./radio-group";
import * as searchField from "./search-field";
import * as select from "./select";
import * as separator from "./separator";
import * as skeleton from "./skeleton";
import * as spinner from "./spinner";
import * as tagGroup from "./tag-group";
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
  comboBox,
  dateField,
  listBox,
  menu,
  modal,
  numberField,
  popover,
  radioGroup,
  searchField,
  select,
  separator,
  skeleton,
  spinner,
  tagGroup,
  textArea,
  textField,
  timeField,
  tooltip,
};

export default preview;
