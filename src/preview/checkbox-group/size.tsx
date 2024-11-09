const code = `
import { Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupSize() {
  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup size="sm" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup size="md" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup size="lg" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
`;

export const size = { code };
