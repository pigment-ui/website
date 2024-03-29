import { Card } from "#/ui/card";
import NextLink from "next/link";

function CardAsChild() {
  return (
    <Card asChild className="border border-red-500 px-8 py-4">
      <NextLink href="#" className="text-yellow-500">
        Click me
      </NextLink>
    </Card>
  );
}

const code = `
import { Card } from "#/ui/card";
import NextLink from "next/link";

function CardAsChild() {
  return (
    <Card asChild className="border border-red-500 px-8 py-4">
      <NextLink href="#" className="text-yellow-500">
        Click me
      </NextLink>
    </Card>
  );
}
`;

export const asChild = { code, preview: <CardAsChild /> };
