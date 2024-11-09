const code = `
import { DateField } from "pigment-ui";

function DateFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <DateField radius="sm" label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />
      <DateField radius="md" label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />
      <DateField radius="lg" label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />
      <DateField radius="full" label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />
      <DateField radius="none" label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const radius = { code };
