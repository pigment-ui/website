"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import { twMerge } from "tailwind-merge";
import { BellIcon } from "lucide-react";
import { capitalize } from "inflection";

import {
  Badge,
  Button,
  Checkbox,
  Chip,
  ColorField,
  ComboBox,
  ComboBoxItem,
  DateField,
  NumberField,
  Pagination,
  Radio,
  RadioGroup,
  SearchField,
  Select,
  SelectItem,
  Slider,
  Switch,
  Tag,
  TagGroup,
  TextArea,
  TextField,
} from "#/ui";
import { parseDate } from "@internationalized/date";

export default function Page() {
  const [page, setPage] = useState(2);

  return (
    <main>
      <div className="container py-32 max-lg:py-24">
        <div className="grid grid-cols-3 gap-8 max-lg:mx-auto max-lg:max-w-[600px] max-lg:grid-cols-1">
          <ButtonBox href="badge">
            <Badge content="99+">
              <BellIcon className="size-8" />
            </Badge>
          </ButtonBox>

          <ButtonBox href="button">
            <Button>Click Me</Button>
          </ButtonBox>

          <ButtonBox href="checkbox">
            <Checkbox defaultSelected>Unsubscribe</Checkbox>
          </ButtonBox>

          <ButtonBox href="chip">
            <Chip>Lorem ipsum</Chip>
          </ButtonBox>

          <ButtonBox href="color-field">
            <ColorField label="Color" defaultValue="#ff2222" description="Lorem ipsum dolor sit amet." className="w-64" />
          </ButtonBox>

          <ButtonBox href="combo-box">
            <ComboBox label="Favorite Animal" defaultSelectedKey="Aardvark" description="Lorem ipsum dolor sit amet." className="w-64">
              <ComboBoxItem>Aardvark</ComboBoxItem>
              <ComboBoxItem>Cat</ComboBoxItem>
              <ComboBoxItem>Dog</ComboBoxItem>
            </ComboBox>
          </ButtonBox>

          <ButtonBox href="date-field">
            <DateField label="Birth date" defaultValue={parseDate("2003-04-08")} description="Lorem ipsum dolor sit amet." className="w-64" />
          </ButtonBox>

          <ButtonBox href="number-field">
            <NumberField label="Width" defaultValue={300} description="Lorem ipsum dolor sit amet." className="w-64" />
          </ButtonBox>

          <ButtonBox href="pagination">
            <Pagination total={3} page={page} onChange={setPage} />
          </ButtonBox>

          <ButtonBox href="radio-grouo">
            <RadioGroup label="Favorite sports" description="Lorem ipsum dolor sit amet." defaultValue="soccer">
              <Radio value="soccer">Soccer</Radio>
              <Radio value="baseball">Baseball</Radio>
            </RadioGroup>
          </ButtonBox>

          <ButtonBox href="search-field">
            <SearchField label="Search" defaultValue="Pigment UI" description="Lorem ipsum dolor sit amet." className="w-64" />
          </ButtonBox>

          <ButtonBox href="select">
            <Select label="Favorite Animal" defaultSelectedKey="Aardvark" description="Lorem ipsum dolor sit amet." className="w-64">
              <SelectItem>Aardvark</SelectItem>
              <SelectItem>Cat</SelectItem>
              <SelectItem>Dog</SelectItem>
            </Select>
          </ButtonBox>

          <ButtonBox href="slider">
            <Slider label="Opacity" defaultValue={30} description="Lorem ipsum dolor sit amet." className="w-64" />
          </ButtonBox>

          <ButtonBox href="switch">
            <Switch defaultSelected>Bluetooth</Switch>
          </ButtonBox>

          <ButtonBox href="tag-group">
            <TagGroup label="Categories" description="Lorem ipsum dolor sit amet." selectionMode="multiple" defaultSelectedKeys={["Travel"]}>
              <Tag>News</Tag>
              <Tag>Travel</Tag>
              <Tag>Gaming</Tag>
            </TagGroup>
          </ButtonBox>

          <ButtonBox href="text-area">
            <TextArea
              label="Comment"
              defaultValue="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
              description="Lorem ipsum dolor sit amet."
              rows={3}
              className="w-64"
            />
          </ButtonBox>

          <ButtonBox href="text-field">
            <TextField label="First Name" defaultValue="Rafig" description="Lorem ipsum dolor sit amet." className="w-64" />
          </ButtonBox>
        </div>
      </div>
    </main>
  );
}

function ButtonBox({ children, href }: { children: ReactNode; href: string }) {
  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({});
  const { focusProps, isFocusVisible } = useFocusRing({});

  return (
    <Link
      href={"/docs/components/" + href}
      {...mergeProps(hoverProps, pressProps, focusProps)}
      className={twMerge(
        "relative flex h-[250px] items-center justify-center rounded-[40px] bg-default-1000/10 duration-300",
        isHovered && "bg-default-1000/20",
        isPressed && "scale-95",
        isFocusVisible ? "outline-2 outline-offset-2 outline-default-1000" : "outline-none",
      )}
    >
      <p className="absolute left-8 top-4 rounded-lg bg-default-1000/10 px-2 py-1 font-mono text-sm font-medium">
        {"<"}
        {href.split("-").map((word) => capitalize(word))}
        {" />"}
      </p>
      <div className="pointer-events-none pt-2">{children}</div>
    </Link>
  );
}
