const code = `
import { TextField } from "#/ui";

function TextFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <TextField radius="sm" label="First name" description="Lorem ipsum dolor sit amet." />
      <TextField radius="md" label="First name" description="Lorem ipsum dolor sit amet." />
      <TextField radius="lg" label="First name" description="Lorem ipsum dolor sit amet." />
      <TextField radius="full" label="First name" description="Lorem ipsum dolor sit amet." />
      <TextField radius="none" label="First name" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const radius = { code };
