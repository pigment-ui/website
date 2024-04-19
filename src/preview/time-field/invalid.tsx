const code = `
import { TimeField } from "#/ui";

function TimeFieldInvalid() {
  return <TimeField isInvalid errorMessage="This is an error message." label="Event time" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const invalid = { code };
