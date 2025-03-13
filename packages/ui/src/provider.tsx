import { Alert } from "./alert";
import { Badge } from "./badge";
import { Button } from "./button";
import { Calendar } from "./calendar";
import { Card } from "./card";
import { Checkbox, CheckboxGroup } from "./checkbox";
import { Chip } from "./chip";
import { ColorField } from "./color-field";
import "./colors.css";
import { ComboBox } from "./combo-box";
import { DateField } from "./date-field";
import { DatePicker } from "./date-picker";
import { DateRangePicker } from "./date-range-picker";
import { Disclosure, DisclosureGroup } from "./disclosure";
import { Field, FieldInput } from "./field";
import { FileTriggerDropzone } from "./file-trigger-dropzone";
import { ListBox } from "./list-box";
import { Menu } from "./menu";
import { Modal } from "./modal";
import { NumberField } from "./number-field";
import { Pagination } from "./pagination";
import { Popover } from "./popover";
import { ProgressBar } from "./progress-bar";
import { RadioGroup } from "./radio";
import { RangeCalendar } from "./range-calendar";
import { SearchField } from "./search-field";
import { Select } from "./select";
import { Separator } from "./separator";
import { Skeleton } from "./skeleton";
import { Slider } from "./slider";
import { Spinner } from "./spinner";
import { Switch } from "./switch";
import { Tabs } from "./tabs";
import { TagGroup } from "./tag";
import { TextArea } from "./text-area";
import { TextField } from "./text-field";
import { TimeField } from "./time-field";
import { Tooltip } from "./tooltip";
import { ChildrenProps } from "./types";
import { createSlots } from "./utils";
import { ComponentPropsWithoutRef, FunctionComponent } from "react";

type MyProps<T extends FunctionComponent<any>> = (props: ComponentPropsWithoutRef<T>) => ComponentPropsWithoutRef<T>;

type GlobalSlotsType = {
  defaultComponentProps: Partial<{
    Alert: MyProps<typeof Alert>;
    Badge: MyProps<typeof Badge>;
    Button: MyProps<typeof Button>;
    Calendar: MyProps<typeof Calendar>;
    Card: MyProps<typeof Card>;
    Checkbox: MyProps<typeof Checkbox>;
    CheckboxGroup: MyProps<typeof CheckboxGroup>;
    Chip: MyProps<typeof Chip>;
    ColorField: MyProps<typeof ColorField>;
    ComboBox: MyProps<typeof ComboBox>;
    DateField: MyProps<typeof DateField>;
    DatePicker: MyProps<typeof DatePicker>;
    DateRangePicker: MyProps<typeof DateRangePicker>;
    Disclosure: MyProps<typeof Disclosure>;
    DisclosureGroup: MyProps<typeof DisclosureGroup>;
    FileTriggerDropzone: MyProps<typeof FileTriggerDropzone>;
    Field: MyProps<typeof Field>;
    FieldInput: MyProps<typeof FieldInput>;
    ListBox: MyProps<typeof ListBox>;
    Menu: MyProps<typeof Menu>;
    Modal: MyProps<typeof Modal>;
    NumberField: MyProps<typeof NumberField>;
    Pagination: MyProps<typeof Pagination>;
    Popover: MyProps<typeof Popover>;
    ProgressBar: MyProps<typeof ProgressBar>;
    RadioGroup: MyProps<typeof RadioGroup>;
    RangeCalendar: MyProps<typeof RangeCalendar>;
    SearchField: MyProps<typeof SearchField>;
    Select: MyProps<typeof Select>;
    Separator: MyProps<typeof Separator>;
    Skeleton: MyProps<typeof Skeleton>;
    Slider: MyProps<typeof Slider>;
    Spinner: MyProps<typeof Spinner>;
    Switch: MyProps<typeof Switch>;
    Tabs: MyProps<typeof Tabs>;
    TagGroup: MyProps<typeof TagGroup>;
    TextArea: MyProps<typeof TextArea>;
    TextField: MyProps<typeof TextField>;
    TimeField: MyProps<typeof TimeField>;
    Tooltip: MyProps<typeof Tooltip>;
  }>;
};

const [GlobalSlots, useGlobalSlots] = createSlots<GlobalSlotsType>();

function Provider({ defaultComponentProps, children }: GlobalSlotsType & ChildrenProps) {
  return <GlobalSlots value={{ defaultComponentProps }}>{children}</GlobalSlots>;
}

function useGlobalProps<T, D extends T>(componentName: keyof GlobalSlotsType["defaultComponentProps"], props: T, defaultProps?: Partial<D>) {
  const newProps = useGlobalSlots()?.defaultComponentProps?.[componentName]?.({ ...defaultProps, ...props });

  return { ...defaultProps, ...newProps, ...props } as Omit<T, keyof D> & Required<D>;
}

export { Provider, useGlobalSlots, useGlobalProps };
