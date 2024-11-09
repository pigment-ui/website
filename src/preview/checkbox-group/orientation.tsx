const code = `
import { Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupOrientation() {
  return (
    <CheckboxGroup orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Checkbox value="soccer">Soccer</Checkbox>
      <Checkbox value="baseball">Baseball</Checkbox>
      <Checkbox value="basketball">Basketball</Checkbox>
    </CheckboxGroup>
  );
}
`;

export const orientation = { code };
