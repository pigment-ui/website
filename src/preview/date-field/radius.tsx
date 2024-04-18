const code = `
import { DateField } from "#/ui";

function DateFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <DateField radius="sm" label="Birth date" description="Lorem ipsum dolor sit amet." />
      <DateField radius="md" label="Birth date" description="Lorem ipsum dolor sit amet." />
      <DateField radius="lg" label="Birth date" description="Lorem ipsum dolor sit amet." />
      <DateField radius="full" label="Birth date" description="Lorem ipsum dolor sit amet." />
      <DateField radius="none" label="Birth date" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const radius = { code };
