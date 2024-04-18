const code = `
import { Button, TextArea } from "#/ui";

function TextAreaValidation() {
  return (
    <form className="w-64 space-y-4">
      <TextArea isRequired label="Comment" description="Lorem ipsum dolor sit amet." />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
