const code = `
import { Button, TimeField } from "#/ui";

function TimeFieldValidation() {
  return (
    <form className="w-64 space-y-4">
      <TimeField isRequired label="Event time" description="Lorem ipsum dolor sit amet." />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
