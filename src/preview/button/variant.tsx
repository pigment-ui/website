const code = `
import { Button } from "pigment-ui";

function ButtonVariant() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="solid">Click me</Button>
      <Button variant="soft">Click me</Button>
      <Button variant="light">Click me</Button>
      <Button variant="bordered">Click me</Button>
      <Button variant="faded">Click me</Button>
    </div>
  );
}
`;

export const variant = { code };
