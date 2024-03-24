import { Button } from "#/ui/button";

function ButtonSize() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button size="sm">Click me</Button>
      <Button size="md">Click me</Button>
      <Button size="lg">Click me</Button>
    </div>
  );
}

const code = `
import { Button } from "#/ui/button";

function ButtonSize() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button size="sm">Click me</Button>
      <Button size="md">Click me</Button>
      <Button size="lg">Click me</Button>
    </div>
  );
}
`;

export const size = { code, preview: <ButtonSize /> };
