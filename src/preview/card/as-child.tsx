import { Card } from "#/ui/card";
import NextLink from "next/link";

function CardAsChild() {
  return (
    <Card asChild className="px-8 py-4 shadow-xl shadow-default-1000/10">
      <NextLink href="#">Click me</NextLink>
    </Card>
  );
}

const code = `
import { Card } from "#/ui/card";
import NextLink from "next/link";

function CardAsChild() {
  return (
    <Card asChild className="px-8 py-4 shadow-xl shadow-default-1000/10">
      <NextLink href="#">Click me</NextLink>
    </Card>
  );
}
`;

export const asChild = { code, preview: <CardAsChild /> };
