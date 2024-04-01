import { Button } from "#/ui/button";

function ButtonDemo() {
  return <Button>Click me</Button>;
}

const code = `
import { Button } from "#/ui/button";

function ButtonDemo() {
  return <Button>Click me</Button>;
}
`;

export const demo = { code, preview: <ButtonDemo /> };
