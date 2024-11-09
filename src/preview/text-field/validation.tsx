const code = `
import { Button, TextField } from "pigment-ui";

function TextFieldValidation() {
  return (
    <form className="space-y-4">
      <TextField isRequired label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
