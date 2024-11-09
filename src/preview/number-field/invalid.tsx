const code = `
import { NumberField } from "pigment-ui";

function NumberFieldInvalid() {
  return <NumberField isInvalid errorMessage="This is an error message." label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const invalid = { code };
