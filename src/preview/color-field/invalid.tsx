const code = `
import { ColorField } from "#/ui";

function ColorFieldInvalid() {
  return <ColorField isInvalid errorMessage="This is an error message." label="Color" description="Lorem ipsum dolor sit amet." />;
}
`;

export const invalid = { code };
