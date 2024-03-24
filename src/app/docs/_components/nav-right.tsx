"use client";

import { Doc } from "contentlayer/generated";
import { slug } from "github-slugger";
import { marked } from "marked";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

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
    <nav className="sticky top-16 col-span-2 h-[calc(100vh-64px)] overflow-y-auto py-16 max-xl:hidden">
      <h3 className="text-sm font-medium uppercase">On this page</h3>

      <ul className="mt-2 flex flex-col gap-y-1">
        {docHeadings.map((heading) => (
          <li key={heading.id} className={twMerge("flex flex-col", heading.level === 3 && "pl-4")}>
            <a
              href={`#${heading.id}`}
              className={twMerge([
                "rounded-xl p-2 text-sm outline-none",
                "focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-default-1000",
                heading.id === activeSlug ? "bg-default-100 text-default-1000" : "text-default-500 hover:bg-default-100",
              ])}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  ) : (
    <div className="w-48"></div>
  );
}
