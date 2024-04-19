const code = `
import { TextField } from "#/ui";

function TextFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <TextField radius="sm" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextField radius="md" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextField radius="lg" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextField radius="full" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextField radius="none" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const radius = { code };
