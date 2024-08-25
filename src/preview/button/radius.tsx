const code = `
import { Button } from "#/ui";

function ButtonRadius() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button radius="none">Click me</Button>
      <Button radius="sm">Click me</Button>
      <Button radius="md">Click me</Button>
      <Button radius="lg">Click me</Button>
      <Button radius="full">Click me</Button>
    </div>
  );
}
`;

export const radius = { code };
