const code = `
import { NumberField } from "#/ui";

function NumberFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <NumberField radius="sm" label="Width" description="Lorem ipsum dolor sit amet." />
      <NumberField radius="md" label="Width" description="Lorem ipsum dolor sit amet." />
      <NumberField radius="lg" label="Width" description="Lorem ipsum dolor sit amet." />
      <NumberField radius="full" label="Width" description="Lorem ipsum dolor sit amet." />
      <NumberField radius="none" label="Width" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const radius = { code };
