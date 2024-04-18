const code = `
import { TextArea } from "#/ui";

function TextAreaDemo() {
  return <TextArea isInvalid errorMessage="This is an error message." label="Comment" description="Lorem ipsum dolor sit amet." />;
}
`;

export const invalid = { code };
