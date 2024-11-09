const code = `
import { Button, NumberField } from "pigment-ui";

function NumberFieldValidation() {
  return (
    <form className="space-y-4">
      <NumberField isRequired label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
