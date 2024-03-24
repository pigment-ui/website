import { Doc } from "contentlayer/generated";
import NextLink from "next/link";
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
                <li key={doc.slug} className="flex flex-col">
                  <NextLink
                    href={doc.url}
                    className={twMerge([
                      "rounded-xl p-2 text-sm outline-none",
                      "focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-default-1000",
                      doc.slug === docProps.slug ? "bg-default-100 text-default-1000" : "text-default-500 hover:bg-default-100",
                    ])}
                    prefetch
                  >
                    {doc.title}
                  </NextLink>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
