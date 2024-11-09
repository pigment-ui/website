const code = `
import { TextField } from "pigment-ui";

function TextFieldInvalid() {
  return <TextField isInvalid errorMessage="This is an error message." label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const invalid = { code };
