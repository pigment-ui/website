import type { ReactNode } from "react";
import { Detail } from "#/components";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Detail />
    </>
  );
}
