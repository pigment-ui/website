"use client";

import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { themes } from "prism-react-renderer";
import { useEffect, useState } from "react";
import { LiveEditor } from "react-live";
import { twMerge } from "tailwind-merge";

import { Button } from "pigment-ui";

export function CodeBlock({
  code: propsCode,
  setCode: setPropsCode,
  language,
  canEdit = false,
  className,
}: {
  code: string;
  setCode?: (code: string) => void;
  language?: string;
  canEdit?: boolean;
  className?: string;
}) {
  const [code, setCode] = useState<string>(propsCode.trim());

  const [copyTrigger, setCopyTrigger] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const clickTimeout = setTimeout(() => setIsCopied(false), 1000);
    return () => clearTimeout(clickTimeout);
  }, [copyTrigger]);

  const { resolvedTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="group relative">
      <div
        className={twMerge(
          "scrollbar-show-on-hover max-h-96 w-full overflow-auto rounded-xl border border-default-1000/20 bg-default-0 font-mono text-sm focus-within:ring-2 focus-within:ring-default-1000",
          className,
        )}
      >
        <LiveEditor
          code={code}
          onChange={(value) => {
            setCode(value);
            setPropsCode?.(value);
          }}
          language={language ?? ""}
          disabled={!canEdit}
          tabMode="focus"
          theme={mounted ? (resolvedTheme === "light" ? themes.oneLight : themes.oneDark) : undefined}
          className={twMerge(
            "w-fit min-w-full [&>pre]:!bg-transparent [&>pre]:!p-4",
            mounted ? canEdit && "[&_pre]:!whitespace-nowrap" : "[&_*]:!text-transparent",
          )}
        />
      </div>

      <Button
        isIconOnly
        variant="light"
        size="sm"
        className="absolute right-2.5 top-2.5 hidden backdrop-blur-lg group-hover:block"
        onPress={() =>
          navigator.clipboard
            .writeText(code)
            .then(() => setIsCopied(true))
            .then(() => setCopyTrigger((prev) => prev + 1))
        }
      >
        {isCopied ? <CopyCheckIcon /> : <CopyIcon />}
      </Button>
    </div>
  );
}
