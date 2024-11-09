const code = `
import { Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupDisabledIndividual() {
  return (
    <CheckboxGroup label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball" isDisabled>Baseball</Checkbox>
      <Checkbox value="basketball">Basketball</Checkbox>
    </CheckboxGroup>
  );
}
`;

export const disabledIndividual = { code };
