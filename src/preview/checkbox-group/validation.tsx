const code = `
import { Button, Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupValidation() {
  return (
    <form className="space-y-4 w-64">
      <CheckboxGroup isRequired label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
