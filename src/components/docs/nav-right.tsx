"use client";

import { Doc } from "contentlayer/generated";
import { slug } from "github-slugger";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Button } from "#/ui";

export function NavRight({ doc }: { doc: Doc }) {
  const docHeadings = marked
    .lexer(doc.body.raw)
    .filter((token) => token.type === "heading")
    // @ts-ignore
    .map((token) => ({ level: token.depth, text: token.text, id: slug(token.text) }));

  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  useEffect(() => {
    const allSections = docHeadings.map((heading) => document.getElementById(heading.id));

    const onScroll = () => {
      allSections.forEach((section) => {
        if (section && section.offsetTop < scrollY + 100) {
          setActiveSlug(section.id);
        }
      });
    };

    docHeadings.length > 0 && setActiveSlug(docHeadings[0].id);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [docHeadings]);

  return docHeadings.length > 0 ? (
    <nav className="scrollbar-show-on-hover sticky top-16 col-span-2 h-[calc(100vh-64px)] overflow-y-auto max-xl:hidden">
      <div className="py-16 pr-4">
        <h3 className="text-sm font-medium uppercase">On this page</h3>
        <ul className="mt-2 space-y-1">
          {docHeadings.map((heading) => (
            <li key={heading.id} className={twMerge(heading.level === 3 && "pl-4")}>
              <Button
                asChild
                isIconOnly
                variant={heading.id === activeSlug ? "soft" : "light"}
                className={twMerge("w-full", heading.id !== activeSlug && "text-default-500", "justify-start")}
              >
                <a href={`#${heading.id}`}>{heading.text}</a>
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  ) : (
    <div className="w-48"></div>
  );
}
