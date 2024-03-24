import { Button } from "#/ui/button";

function ButtonUsage() {
  return <Button>Click me</Button>;
}

const code = `
import { Button } from "#/ui/button";

function ButtonUsage() {
  return <Button>Click me</Button>;
}
`;

export const usage = { code, preview: <ButtonUsage /> };
