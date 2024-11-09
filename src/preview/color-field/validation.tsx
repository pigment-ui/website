const code = `
import { Button, ColorField } from "pigment-ui";

function ColorFieldValidation() {
  return (
    <form className="w-64 space-y-4">
      <ColorField isRequired label="Color" description="Lorem ipsum dolor sit amet." />
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
