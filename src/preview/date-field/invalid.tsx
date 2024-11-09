const code = `
import { DateField } from "pigment-ui";

function DateFieldInvalid() {
  return <DateField isInvalid errorMessage="This is an error message." label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const invalid = { code };
