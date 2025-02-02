"use client";

import { ComponentBox } from "#/components";
import { capitalize } from "inflection";
import { BellIcon } from "lucide-react";
import {
  Badge,
  Button,
  Chip,
  Pagination,
  ProgressBar,
  Spinner,
  Switch,
  Tab,
  TabList,
  TabPanel,
  Tabs,
  Tag,
  TagGroup,
  Tooltip,
  TooltipTrigger,
} from "pigment-ui";
import { useEffect, useState } from "react";
import { Button as AriaButton } from "react-aria-components";
import { twMerge } from "tailwind-merge";

type Colors = "orange" | "teal" | "indigo" | "fuchsia";

const COLORS: Record<Colors, string> = {
  orange: "249 115 22",
  teal: "20 184 166",
  indigo: "99 102 241",
  fuchsia: "217 70 239",
};

const setPrimaryColor = (color: Colors) => document.documentElement.style.setProperty("--primary-500", COLORS[color]);

export default function Page() {
  const [page, setPage] = useState(2);

  useEffect(() => {
    return () => setPrimaryColor("orange");
  }, []);

  return (
    <main className="space-y-16 py-32 max-lg:space-y-12 max-lg:py-24">
      <div className="container flex flex-wrap gap-8 max-lg:gap-6">
        {Object.keys(COLORS).map((color) => (
          <TooltipTrigger key={color} delay={0} closeDelay={0}>
            <AriaButton
              aria-label={color}
              onPress={() => setPrimaryColor(color as Colors)}
              className={({ isHovered, isPressed, isFocusVisible }) =>
                twMerge([
                  "size-16 rounded-full duration-300 max-lg:size-12",
                  isHovered && "opacity-90",
                  isPressed && "scale-95",
                  isFocusVisible ? "outline outline-2 outline-offset-2 outline-default-1000" : "outline-none",
                ])
              }
              style={{ backgroundColor: `rgb(${COLORS[color as Colors]})` }}
            />
            <Tooltip>{capitalize(color)}</Tooltip>
          </TooltipTrigger>
        ))}
      </div>

      <div className="container">
        <div className="grid grid-cols-3 gap-8 max-lg:mx-auto max-lg:max-w-[600px] max-lg:grid-cols-1">
          <ComponentBox id="badge">
            <Badge color="primary" content="99+">
              <BellIcon className="size-8" />
            </Badge>
          </ComponentBox>

          <ComponentBox id="button">
            <Button color="primary">Click Me</Button>
          </ComponentBox>

          <ComponentBox id="chip">
            <Chip color="primary">Lorem ipsum</Chip>
          </ComponentBox>

          <ComponentBox id="pagination">
            <Pagination color="primary" total={3} page={page} onChange={setPage} />
          </ComponentBox>

          <ComponentBox id="progress-bar">
            <ProgressBar color="primary" label="Loading…" isIndeterminate className="w-64" />
          </ComponentBox>

          <ComponentBox id="spinner">
            <Spinner color="primary" />
          </ComponentBox>

          <ComponentBox id="switch">
            <Switch color="primary" defaultSelected>
              Bluetooth
            </Switch>
          </ComponentBox>

          <ComponentBox id="tabs">
            <Tabs color="primary">
              <TabList aria-label="Lorem ipsum dolor sit amet">
                <Tab id="item-1">Tab 1</Tab>
                <Tab id="item-2">Tab 2</Tab>
                <Tab id="item-3">Tab 3</Tab>
              </TabList>
              <TabPanel id="item-1">Lorem ipsum dolor sit amet.</TabPanel>
              <TabPanel id="item-2">Consectetur adipisicing elit.</TabPanel>
              <TabPanel id="item-3">Eaque ex nam quasi.</TabPanel>
            </Tabs>
          </ComponentBox>

          <ComponentBox id="tag-group">
            <TagGroup
              color="primary"
              label="Categories"
              description="Lorem ipsum dolor sit amet."
              selectionMode="multiple"
              defaultSelectedKeys={["Travel"]}
            >
              <Tag>News</Tag>
              <Tag>Travel</Tag>
              <Tag>Gaming</Tag>
            </TagGroup>
          </ComponentBox>
        </div>
      </div>
    </main>
  );
}
