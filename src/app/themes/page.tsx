"use client";

import { useEffect, useState } from "react";
import { Badge, Button, Chip, Pagination, Spinner, Tag, TagGroup } from "#/ui";
import { BellIcon } from "lucide-react";
import { Button as AriaButton } from "react-aria-components";

import { ComponentBox } from "#/app/page";
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
          <AriaButton
            key={color}
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

          <ComponentBox id="spinner">
            <Spinner color="primary" />
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
