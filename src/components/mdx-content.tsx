import { useMDXComponent } from "next-contentlayer/hooks";
import { HTMLAttributes } from "react";
import { slug } from "github-slugger";
import { twMerge } from "tailwind-merge";
import { MDXComponents } from "mdx/types";
import NextLink from "next/link";
import Image from "next/image";

import { CodeBlock } from "./code-block";

export function MDXContent({ code, components }: { code: string; components?: MDXComponents }) {
  const Component = useMDXComponent(code);

  return (
    <div className="space-y-8 [&>h2:not(:first-child)]:!mt-16">
      <Component components={{ ...mdxComponents, ...components }} />
    </div>
  );
}

const mdxComponents = {
  h2: ({ ...props }) => <Heading as="h2" {...props} />,
  h3: ({ ...props }) => <Heading as="h3" {...props} />,
  pre: ({ ...props }) => <CodeBlock value={{ code: props.children.props.children }} />,
  code: ({ ...props }) => <code {...props} className="rounded-lg bg-default-200 p-1 text-sm" />,
  ul: ({ ...props }) => <ul {...props} className="list-disc space-y-2 p-4" />,
  a: ({ ...props }) => <NextLink href="#" {...props} className="text-default-700 underline underline-offset-4 hover:text-default-500" />,
  NextImage: ({ ...props }) => <Image src="" alt="" {...props} className={twMerge("rounded-xl border border-default-200", props.className)} />,
  Steps: ({ ...props }) => (
    <div
      className="[&>h3]:step relative ml-3.5 space-y-4 border-l border-default-200 pl-7 [counter-reset:step] [&>h3:not(:first-child)]:!mt-8"
      {...props}
    />
  ),
};

function Heading({ as, ...props }: { as: "h2" | "h3" } & HTMLAttributes<HTMLHeadingElement>) {
  const Component = as;
  const text = props.children as string;
  const id = slug(text);
  const classNames = { h2: "text-3xl", h3: "text-xl" };

  return (
    <Component id={id} className={twMerge("relative font-bold", classNames[as])}>
      <span className="group">
        {text}
        <a
          aria-label={`Link to section ${id}`}
          href={`#${id}`}
          className={twMerge([
            "absolute right-full px-2 text-default-500 opacity-0",
            "hover:text-default-700 group-hover:opacity-100",
            "focus-visible:opacity-100 focus-visible:outline-default-1000",
          ])}
        >
          #
        </a>
      </span>
    </Component>
  );
}
