const code = `
import { TimeField } from "#/ui";

function TimeFieldInvalid() {
  return <TimeField isInvalid errorMessage="This is an error message." label="Event time" description="Lorem ipsum dolor sit amet." />;
}
`;

export const invalid = { code };
