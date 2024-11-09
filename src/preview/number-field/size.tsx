const code = `
import { NumberField } from "pigment-ui";

function NumberFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <NumberField size="sm" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
      <NumberField size="md" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
      <NumberField size="lg" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const size = { code };
