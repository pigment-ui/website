import NextLink from "next/link";

const code = `
import { Button } from "pigment-ui";
import NextLink from "next/link";

function ButtonAsChild() {
  return (
    <Button asChild>
      <NextLink href="#">Click me</NextLink>
    </Button>
  );
}
`;

export const asChild = { code, scope: { NextLink } };
