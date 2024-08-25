"use client";

import { Button } from "#/ui";

export default function Page() {
  return (
    <main>
      <div className="container py-32">
        <Button
          onPress={() => {
            document.documentElement.style.setProperty("--primary-500", "120 115 22");
          }}
        >
          Click me
        </Button>

        <div className="mt-32 flex gap-4">
          <div className="size-16 rounded-xl bg-primary-50"></div>
          <div className="size-16 rounded-xl bg-primary-100"></div>
          <div className="size-16 rounded-xl bg-primary-200"></div>
          <div className="size-16 rounded-xl bg-primary-300"></div>
          <div className="size-16 rounded-xl bg-primary-400"></div>
          <div className="size-16 rounded-xl bg-primary-500"></div>
          <div className="size-16 rounded-xl bg-primary-600"></div>
          <div className="size-16 rounded-xl bg-primary-700"></div>
          <div className="size-16 rounded-xl bg-primary-800"></div>
          <div className="size-16 rounded-xl bg-primary-900"></div>
          <div className="size-16 rounded-xl bg-primary-950"></div>
        </div>
      </div>
    </main>
  );
}
