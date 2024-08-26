"use client";

import { ReactNode } from "react";
import { mergeProps, useFocusRing, useHover, usePress } from "react-aria";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { capitalize } from "inflection";

export function ComponentBox({ children, id }: { children: ReactNode; id: string }) {
  const { hoverProps, isHovered } = useHover({});
  const { pressProps, isPressed } = usePress({});
  const { focusProps, isFocusVisible } = useFocusRing({});

  return (
    <div className="relative flex h-[250px] items-center justify-center rounded-[40px] bg-default-1000/10 duration-300">
      <Link
        href={"/docs/" + id}
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
