import { ReactNode } from "react";
import { CodeBlock } from "../shared";

import * as button from "#/preview/button";

export function ComponentPreview({ slug }: { slug: string }) {
  const name = slug.split("/")[0];
  const section = slug.split("/")[1];
  const code = previews[name][section]?.code ?? "No code available";
  const preview = previews[name][section]?.preview ?? "No preview available";

  return (
    <div className="[&>div>pre]:rounded-t-none">
      <div className="grid min-h-64 place-items-center rounded-t-xl border border-b-0 border-default-200 bg-default-0/50 p-8 backdrop-blur-xl">
        {preview}
      </div>
      <CodeBlock code={code} language="tsx" />
    </div>
  );
}

const previews: Record<string, Record<string, { code: string; preview: ReactNode }>> = {
  button,
};
