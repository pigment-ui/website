import { slug } from "github-slugger";
import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

export function Heading({ as, ...props }: { as: "h2" | "h3" } & HTMLAttributes<HTMLHeadingElement>) {
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
