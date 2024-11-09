const code = `
import { TextArea } from "pigment-ui";

function TextAreaInvalid() {
  return <TextArea isInvalid errorMessage="This is an error message." label="Comment" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const invalid = { code };
