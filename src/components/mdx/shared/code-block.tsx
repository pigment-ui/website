import { useEffect, useState } from "react";
import { Button } from "#/ui/button";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";

export function CodeBlock({ code: codeProps, language = "tsx" }: { code: string; language?: string }) {
  const code = codeProps.trim();

  const [copyTrigger, setCopyTrigger] = useState<number>(0);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    const clickTimeout = setTimeout(() => setIsCopied(false), 1000);
    return () => clearTimeout(clickTimeout);
  }, [copyTrigger]);

  const { resolvedTheme } = useTheme();

  return (
    <div className="relative">
      <Highlight theme={resolvedTheme === "light" ? themes.oneLight : themes.oneDark} code={code} language={language}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="max-h-96 overflow-auto rounded-xl border border-default-200 bg-default-0 p-4 font-mono text-sm">
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>

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
