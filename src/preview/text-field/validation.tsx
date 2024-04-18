const code = `
import { Button, TextField } from "#/ui";

function TextFieldValidation() {
  return (
    <form className="w-64 space-y-4">
      <TextField isRequired label="First name" description="Lorem ipsum dolor sit amet." />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
