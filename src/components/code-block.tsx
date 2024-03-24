"use client";

import { ElementType, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { Button } from "#/ui/button";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

export function CodeBlock({ value: { code: codeProps, Preview } }: { value: { code: string; Preview?: ElementType } }) {
  const code = codeProps.trim();

  const [copyTrigger, setCopyTrigger] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const clickTimeout = setTimeout(() => setIsCopied(false), 1000);
    return () => clearTimeout(clickTimeout);
  }, [copyTrigger]);

  return (
    <div>
      {!!Preview && (
        <div className="grid min-h-64 place-items-center rounded-t-xl border border-b-0 border-default-200 bg-default-0/50 backdrop-blur-xl">
          <Preview />
        </div>
      )}

      <div className="relative">
        <pre
          className={twMerge(
            "max-h-96 overflow-auto rounded-xl border border-default-200 bg-default-0 p-4 font-mono text-sm",
            !!Preview && "rounded-t-none",
          )}
        >
          <code>{code}</code>
        </pre>

        <Button
          isIconOnly
          variant="light"
          size="sm"
          className="absolute right-2.5 top-2.5"
          onPress={() =>
            navigator.clipboard
              .writeText(code)
              .then(() => setIsCopied(true))
              .then(() => setCopyTrigger((prev) => prev + 1))
          }
        >
          {isCopied ? <CheckIcon /> : <CopyIcon />}
        </Button>
      </div>
    </div>
  );
}
