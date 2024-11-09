const code = `
import { TextField } from "pigment-ui";

function TextFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <TextField size="sm" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextField size="md" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
      <TextField size="lg" label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const size = { code };
