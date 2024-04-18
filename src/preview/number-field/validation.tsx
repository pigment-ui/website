const code = `
import { Button, NumberField } from "#/ui";

function NumberFieldValidation() {
  return (
    <form className="w-64 space-y-4">
      <NumberField isRequired label="Width" description="Lorem ipsum dolor sit amet." />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
