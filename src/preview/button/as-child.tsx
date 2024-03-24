import { Button } from "#/ui/button";
import NextLink from "next/link";

function ButtonAsChild() {
  return (
    <Button asChild>
      <NextLink href="#">Click me</NextLink>
    </Button>
  );
}

const code = `
import { Button } from "#/ui/button";
import NextLink from "next/link";

function ButtonAsChild() {
  return (
    <Button asChild>
      <NextLink href="#">Click me</NextLink>
    </Button>
  );
}
`;

export const asChild = { code, preview: <ButtonAsChild /> };
