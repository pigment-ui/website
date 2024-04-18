const code = `
import { Button, DateField } from "#/ui";

function DateFieldValidation() {
  return (
    <form className="w-64 space-y-4">
      <DateField isRequired label="Birth date" description="Lorem ipsum dolor sit amet." />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
