const code = `
import { NumberField } from "#/ui";

function NumberFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <NumberField size="sm" label="Width" description="Lorem ipsum dolor sit amet." />
      <NumberField size="md" label="Width" description="Lorem ipsum dolor sit amet." />
      <NumberField size="lg" label="Width" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const size = { code };
