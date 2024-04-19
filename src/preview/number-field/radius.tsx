const code = `
import { NumberField } from "#/ui";

function NumberFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <NumberField radius="sm" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
      <NumberField radius="md" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
      <NumberField radius="lg" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
      <NumberField radius="full" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
      <NumberField radius="none" label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const radius = { code };
