"use client";

import NextLink from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { twMerge } from "tailwind-merge";

import { CodeBlock, Heading } from "./shared";
import * as docsComponents from "./docs";

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="space-y-4 [&_h2]:!mt-16 [&_h3]:!mt-8">
      <Component components={mdxComponents} />
    </div>
  );
}

const mdxComponents = {
  h2: ({ ...props }) => <Heading as="h2" {...props} />,
  h3: ({ ...props }) => <Heading as="h3" {...props} />,
  pre: ({ ...props }) => <CodeBlock code={props.children.props.children} language="" />,
  code: ({ ...props }) => <code {...props} className="rounded-lg bg-default-1000/10 p-1 text-sm" />,
  ul: ({ ...props }) => <ul {...props} className="list-disc space-y-2 px-4" />,
  NextImage: ({ ...props }) => (
    <Image src="" alt="" priority {...props} className={twMerge("rounded-xl border border-default-200", props.className)} />
  ),
  a: ({ ...props }) => (
    <NextLink
      href="#"
      target={props.href.startsWith("http") ? "_blank" : undefined}
      {...props}
      className="text-default-700 underline underline-offset-4 hover:text-default-500"
    />
  ),
  Steps: ({ ...props }) => <div className="[&>h3]:step relative ml-3.5 space-y-4 border-l border-default-200 pl-7 [counter-reset:step]" {...props} />,
  ...docsComponents,
};
