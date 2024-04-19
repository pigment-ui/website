"use client";

import { Button } from "#/ui";

export default function Page() {
  return (
    <main>
      <div className="container py-32">
        <Button onPress={() => console.log("Clicked")}>Click me</Button>

        <div className="mt-32 flex gap-4">
          <div className="bg-primary-50 size-16 rounded-xl"></div>
          <div className="bg-primary-100 size-16 rounded-xl"></div>
          <div className="bg-primary-200 size-16 rounded-xl"></div>
          <div className="bg-primary-300 size-16 rounded-xl"></div>
          <div className="bg-primary-400 size-16 rounded-xl"></div>
          <div className="bg-primary-500 size-16 rounded-xl"></div>
          <div className="bg-primary-600 size-16 rounded-xl"></div>
          <div className="bg-primary-700 size-16 rounded-xl"></div>
          <div className="bg-primary-800 size-16 rounded-xl"></div>
          <div className="bg-primary-900 size-16 rounded-xl"></div>
          <div className="bg-primary-950 size-16 rounded-xl"></div>
        </div>
      </div>
    </main>
  );
}
