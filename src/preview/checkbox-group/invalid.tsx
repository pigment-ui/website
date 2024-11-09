const code = `
import { Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupInvalid() {
  return (
    <CheckboxGroup isInvalid errorMessage="This is an error message." label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="basketball">Basketball</Checkbox>
    </CheckboxGroup>
  );
}
`;

export const invalid = { code };
