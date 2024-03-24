import { Doc } from "contentlayer/generated";
import NextLink from "next/link";
import { Button } from "#/ui/button";
import { twMerge } from "tailwind-merge";

export function NavLeft({ doc: docProps, allDocs }: { doc: Doc; allDocs: Doc[] }) {
  const docGroupNames = Array.from(new Set(allDocs.map((doc) => doc.slug.split("/")[0])));

  return (
    <nav className="sticky top-16 col-span-2 h-[calc(100vh-64px)] overflow-y-auto py-16 max-lg:hidden">
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
      ))}
    </nav>
  );
}
