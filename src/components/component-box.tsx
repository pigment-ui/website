"use client";

import { capitalize } from "inflection";
import Link from "next/link";
import { ReactNode } from "react";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import { twMerge } from "tailwind-merge";

export function ComponentBox({ children, id }: { children: ReactNode; id: string }) {
  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({});
  const { focusProps, isFocusVisible } = useFocusRing({});

  return (
    <div className="relative flex h-[250px] items-center justify-center rounded-3xl border border-default-200 bg-default-50">
      <Link
        href={"/docs/components/" + id}
        {...mergeProps(hoverProps, pressProps, focusProps)}
        className={twMerge([
          "absolute left-8 top-4 rounded-lg bg-default-1000/10 px-2 py-1 font-mono text-sm font-medium duration-300",
          isHovered && "bg-default-1000/20",
          isPressed && "scale-95",
          isFocusVisible ? "outline outline-1 outline-offset-1 outline-default-1000" : "outline-none",
        ])}
      >
        {"<"}
        {id.split("-").map((word) => capitalize(word))}
        {" />"}
      </Link>
      <div>{children}</div>
    </div>
  );
}
