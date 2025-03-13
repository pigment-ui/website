"use client";

import { ThemeProvider } from "next-themes";
import { Provider } from "packages/ui/src";
import { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class">
      <Provider
        defaultComponentProps={{
          Button: ({}) => {
            return { radius: "full", variant: "bordered" };
          },
        }}
      >
        {children}
      </Provider>
    </ThemeProvider>
  );
}
