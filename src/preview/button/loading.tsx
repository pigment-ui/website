import { Button } from "#/ui/button";

function ButtonLoading() {
  return <Button isLoading>Click me</Button>;
}

const code = `
import { Button } from "#/ui/button";

function ButtonLoading() {
  return <Button isLoading>Click me</Button>;
}
`;

export const loading = { code, preview: <ButtonLoading /> };
