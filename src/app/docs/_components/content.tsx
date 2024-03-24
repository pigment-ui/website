"use client";

import { Doc } from "contentlayer/generated";
import NextLink from "next/link";
import { ArrowLeftIcon, ArrowRightIcon, GitHubLogoIcon } from "@radix-ui/react-icons";
import { Button } from "#/ui/button";
import { Separator } from "#/ui/separator";
import { MDXContent } from "#/components";
import * as components from "./mdx-components";

export function Content({ doc, allDocs }: { doc: Doc; allDocs: Doc[] }) {
  const docIndex = allDocs.findIndex((d) => d.slug === doc.slug);
  const previousDoc = docIndex !== 0 ? allDocs[docIndex - 1] : undefined;
  const nextDoc = docIndex !== allDocs.length - 1 ? allDocs[docIndex + 1] : undefined;

  return (
    <article className="col-span-10 space-y-16 py-16 lg:px-16 xl:col-span-8">
      <div className="space-y-4">
        <h1 className="text-5xl font-bold">{doc.title}</h1>
        <p className="text-default-700">{doc.description}</p>
      </div>

      <Separator />

      <MDXContent code={doc.body.code} components={components} />

      <Button asChild startContent={<GitHubLogoIcon />} variant="faded" className="w-fit">
        <a href="https://github.com/pigment-ui" target="_blank">
          Edit this page
        </a>
      </Button>

      <Separator />

      <div className="flex">
        {previousDoc && (
          <Button asChild variant="light" startContent={<ArrowLeftIcon />}>
            <NextLink href={previousDoc.url}>{previousDoc.title}</NextLink>
          </Button>
        )}
        {nextDoc && (
          <Button asChild variant="light" endContent={<ArrowRightIcon />} className="ml-auto">
            <NextLink href={nextDoc.url}>{nextDoc.title}</NextLink>
          </Button>
        )}
      </div>
    </article>
  );
}
