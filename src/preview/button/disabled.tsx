import { Button } from "#/ui/button";

function ButtonDisabled() {
  return <Button isDisabled>Click me</Button>;
}

const code = `
import { Button } from "#/ui/button";

function ButtonDisabled() {
  return <Button isDisabled>Click me</Button>;
}
`;

export const disabled = { code, preview: <ButtonDisabled /> };
