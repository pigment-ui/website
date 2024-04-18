const code = `
import { NumberField } from "#/ui";

function NumberFieldInvalid() {
  return <NumberField isInvalid errorMessage="This is an error message." label="Width" description="Lorem ipsum dolor sit amet." />;
}
`;

export const invalid = { code };
