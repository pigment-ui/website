"use client";

import { Doc } from "contentlayer/generated";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import NextLink from "next/link";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

import { Button } from "#/ui";

export function NavLeft({ doc: docProps, allDocs }: { doc: Doc; allDocs: Doc[] }) {
  const docGroupNames = Array.from(new Set(allDocs.map((doc) => doc.slug.split("/")[0])));

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="sticky top-16 z-10 max-lg:-mx-4 lg:col-span-2 lg:h-[calc(100vh-64px)]">
      <button
        className="flex w-full items-center gap-2 border-b border-b-default-1000/20 bg-default-0/75 p-4 text-start backdrop-blur-lg hover:bg-default-1000/10 active:bg-default-1000/20 lg:hidden [&>svg]:size-4"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        Menu
      </button>

      <div
        className={twMerge([
          "scrollbar-show-on-hover h-full overflow-y-auto pr-4",
          "max-lg:pb-32 max-lg:pl-4 max-lg:pt-8 lg:py-16",
          "max-lg:absolute max-lg:inset-x-0 max-lg:top-full max-lg:h-[calc(100vh-120px)]",
          "max-lg:bg-default-0/75 max-lg:backdrop-blur-lg",
          !isOpen && "max-lg:hidden",
        ])}
      >
        {docGroupNames.map((docGroupName) => (
          <div key={docGroupName} className="mt-8 first:mt-0">
            <h3 className="text-sm font-medium uppercase">{docGroupName}</h3>
            <ul className="mt-2 flex flex-col gap-y-1">
              {allDocs
                .filter((doc) => doc.slug.split("/")[0] === docGroupName)
                .map((doc) => (
                  <li key={doc.slug}>
                    <Button
                      asChild
                      isIconOnly
                      variant={doc.slug === docProps.slug ? "soft" : "light"}
                      className={twMerge(doc.slug !== docProps.slug && "text-default-500", "justify-start")}
                    >
                      <NextLink href={doc.url} prefetch>
                        {doc.title}
                      </NextLink>
                    </Button>
                  </li>
                ))}
            </ul>
          </div>
        ))}{" "}
      </div>
    </nav>
  );
}
