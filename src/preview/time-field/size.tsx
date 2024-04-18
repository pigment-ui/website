const code = `
import { TimeField } from "#/ui";

function TimeFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField size="sm" label="Event time" description="Lorem ipsum dolor sit amet." />
      <TimeField size="md" label="Event time" description="Lorem ipsum dolor sit amet." />
      <TimeField size="lg" label="Event time" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const size = { code };
