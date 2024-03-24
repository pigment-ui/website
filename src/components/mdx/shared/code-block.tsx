import { useEffect, useState } from "react";
import { Button } from "#/ui/button";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

export function CodeBlock({ code: codeProps }: { code: string }) {
  const code = codeProps.trim();

  const [copyTrigger, setCopyTrigger] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const clickTimeout = setTimeout(() => setIsCopied(false), 1000);
    return () => clearTimeout(clickTimeout);
  }, [copyTrigger]);

  return (
    <div className="relative">
      <pre className="max-h-96 overflow-auto rounded-xl border border-default-200 bg-default-0 p-4 font-mono text-sm">
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
  );
}
