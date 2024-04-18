"use client";

import { useState } from "react";
import { LiveError, LivePreview, LiveProvider } from "react-live";

import * as ui from "#/ui";
import preview from "#/preview";

import { CodeBlock } from "../shared";

function filterPreviewCode(code: string) {
  return code
    .split("\n")
    .filter((line) => !line.includes("import"))
    .join("\n");
}

export function ComponentPreview({ slug }: { slug: string }) {
  const name = slug.split("/")[0];
  const section = slug.split("/")[1];
  const code = preview?.[name]?.[section]?.code ?? "";
  const scope = preview?.[name]?.[section]?.scope ?? {};

  const [previewCode, setPreviewCode] = useState<string>(filterPreviewCode(code));

  return (
    <div>
      <div>
        <LiveProvider code={previewCode} scope={{ ...ui, ...scope }}>
          <div className="grid min-h-64 place-items-center rounded-t-xl border border-b-0 border-default-1000/20 bg-default-0/50 p-8 backdrop-blur-xl">
            <LivePreview />
          </div>
          <div>
            <LiveError className="overflow-auto border border-b-0 border-error-700/20 bg-error-100/50 p-4 text-sm text-error-500 backdrop-blur-xl" />
          </div>
          <CodeBlock code={code} setCode={(value) => setPreviewCode(filterPreviewCode(value))} language="tsx" canEdit className="rounded-t-none" />
        </LiveProvider>
      </div>
    </div>
  );
}
