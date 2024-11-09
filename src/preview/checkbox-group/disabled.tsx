const code = `
import { Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupDisabled() {
  return (
    <CheckboxGroup isDisabled label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="basketball">Basketball</Checkbox>
    </CheckboxGroup>
  );
}
`;

export const disabled = { code };
