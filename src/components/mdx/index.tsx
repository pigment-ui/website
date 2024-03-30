import NextLink from "next/link";
import Image from "next/image";
import { useMDXComponent } from "next-contentlayer/hooks";
import { twMerge } from "tailwind-merge";

import { CodeBlock, Heading } from "./shared";
import * as docsComponents from "./docs";

export function MDXContent({ code }: { code: string }) {
  const Component = useMDXComponent(code);

  return (
    <div className="space-y-4 [&>h2]:!mt-16 [&>h3]:!mt-8">
      <Component components={mdxComponents} />
    </div>
  );
}

const mdxComponents = {
  h2: ({ ...props }) => <Heading as="h2" {...props} />,
  h3: ({ ...props }) => <Heading as="h3" {...props} />,
  pre: ({ ...props }) => <CodeBlock code={props.children.props.children} language={props["data-language"]} />,
  code: ({ ...props }) => <code {...props} className="whitespace-nowrap rounded-lg bg-default-1000/10 p-1 text-sm" />,
  ul: ({ ...props }) => <ul {...props} className="list-disc space-y-2 px-4" />,
  NextImage: ({ ...props }) => (
    <Image src="" alt="" priority {...props} className={twMerge("rounded-xl border border-default-1000/20", props.className)} />
  ),
  a: ({ ...props }) => {
    const isExternal = props.href.startsWith("http");
    const Component = isExternal ? "a" : NextLink;

    return (
      <Component
        href="#"
        prefetch={!isExternal ? true : undefined}
        target={isExternal ? "_blank" : undefined}
        {...props}
        className="text-default-700 underline underline-offset-4 hover:text-default-500"
      />
    );
  },
  Steps: ({ ...props }) => (
    <div className="[&>h3]:step relative ml-3.5 space-y-4 border-l border-default-200 pl-7 [counter-reset:step] [&>h3]:!mt-8" {...props} />
  ),
  ...docsComponents,
};
