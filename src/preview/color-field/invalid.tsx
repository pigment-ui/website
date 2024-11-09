const code = `
import { ColorField } from "pigment-ui";

function ColorFieldInvalid() {
  return <ColorField isInvalid errorMessage="This is an error message." label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const invalid = { code };
