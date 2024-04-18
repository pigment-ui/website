const code = `
import { TextField } from "#/ui";

function TextFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <TextField size="sm" label="First name" description="Lorem ipsum dolor sit amet." />
      <TextField size="md" label="First name" description="Lorem ipsum dolor sit amet." />
      <TextField size="lg" label="First name" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const size = { code };
