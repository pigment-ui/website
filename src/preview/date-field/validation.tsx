const code = `
import { Button, DateField } from "pigment-ui";

function DateFieldValidation() {
  return (
    <form className="space-y-4">
      <DateField isRequired label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
