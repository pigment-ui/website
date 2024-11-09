const code = `
import { DateField } from "pigment-ui";

function DateFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <DateField size="sm" label="Birth date" description="Lorem ipsum dolor sit amet." />
      <DateField size="md" label="Birth date" description="Lorem ipsum dolor sit amet." />
      <DateField size="lg" label="Birth date" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const size = { code };
