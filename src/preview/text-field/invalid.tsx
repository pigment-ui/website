const code = `
import { TextField } from "#/ui";

function TextFieldInvalid() {
  return <TextField isInvalid errorMessage="This is an error message." label="First name" description="Lorem ipsum dolor sit amet." />;
}
`;

export const invalid = { code };
