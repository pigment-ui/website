"use client";

import { Doc } from "contentlayer/generated";
import { ArrowLeftIcon, ArrowRightIcon, ExternalLinkIcon, GithubIcon } from "lucide-react";
import NextLink from "next/link";

import { MDXContent } from "#/components";
import { Button, Separator } from "pigment-ui-test";

export function Content({ doc, allDocs }: { doc: Doc; allDocs: Doc[] }) {
  const docIndex = allDocs.findIndex((d) => d.slug === doc.slug);
  const previousDoc = docIndex !== 0 ? allDocs[docIndex - 1] : undefined;
  const nextDoc = docIndex !== allDocs.length - 1 ? allDocs[docIndex + 1] : undefined;

  return (
    <article className="col-span-10 space-y-16 py-16 lg:px-16 xl:col-span-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">{doc.title}</h1>
        <p className="text-default-700">{doc.description}</p>

        {(doc.slug.split("/")[0] === "components" || doc.referenceUrl || doc.hasApiReference) && (
          <div className="flex flex-wrap gap-4">
            {doc.slug.split("/")[0] === "components" && (
              <Button asChild size="sm" variant="soft" startContent={<GithubIcon />}>
                <a href={`https://github.com/pigment-ui/website/blob/main/packages/ui/src/${doc.slug.split("/")[1]}.tsx`} target="_blank">
                  Source
                </a>
              </Button>
            )}
            {doc.referenceUrl && (
              <Button asChild size="sm" variant="soft" startContent={<ExternalLinkIcon />}>
                <a href={doc.referenceUrl} target="_blank">
                  Reference
                </a>
              </Button>
            )}
            {doc.hasApiReference && doc.referenceUrl && (
              <Button asChild size="sm" variant="soft" startContent={<ExternalLinkIcon />}>
                <a href={doc.referenceUrl + "#props"} target="_blank">
                  API Reference
                </a>
              </Button>
            )}
          </div>
        )}
      </div>

      <Separator />

      <MDXContent code={doc.body.code} />

      <Button asChild startContent={<GithubIcon />} variant="faded" className="w-fit">
        <a href={`https://github.com/pigment-ui/website/edit/main/src/content/${doc._raw.flattenedPath}.mdx`} target="_blank">
          Edit this page
        </a>
      </Button>

      <Separator />

      <div className="flex">
        {previousDoc && (
          <Button asChild variant="light" startContent={<ArrowLeftIcon />}>
            <NextLink href={previousDoc.url} prefetch>
              {previousDoc.title}
            </NextLink>
          </Button>
        )}
        {nextDoc && (
          <Button asChild variant="light" endContent={<ArrowRightIcon />} className="ml-auto">
            <NextLink href={nextDoc.url} prefetch>
              {nextDoc.title}
            </NextLink>
          </Button>
        )}
      </div>
    </article>
  );
}
