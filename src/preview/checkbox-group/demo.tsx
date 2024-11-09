const code = `
import { Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupDemo() {
  return (
    <CheckboxGroup label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="basketball">Basketball</Checkbox>
    </CheckboxGroup>
  );
}
`;

export const demo = { code };
