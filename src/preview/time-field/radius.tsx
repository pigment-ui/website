const code = `
import { TimeField } from "#/ui";

function TimeFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField radius="sm" label="Event time" description="Lorem ipsum dolor sit amet." />
      <TimeField radius="md" label="Event time" description="Lorem ipsum dolor sit amet." />
      <TimeField radius="lg" label="Event time" description="Lorem ipsum dolor sit amet." />
      <TimeField radius="full" label="Event time" description="Lorem ipsum dolor sit amet." />
      <TimeField radius="none" label="Event time" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const radius = { code };
