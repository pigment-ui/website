const code = `
import { TimeField } from "#/ui";

function TimeFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <TimeField radius="sm" label="Event time" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TimeField radius="md" label="Event time" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TimeField radius="lg" label="Event time" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TimeField radius="full" label="Event time" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TimeField radius="none" label="Event time" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const radius = { code };
