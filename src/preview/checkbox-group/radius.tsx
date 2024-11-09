const code = `
import { Checkbox, CheckboxGroup } from "pigment-ui";

function CheckboxGroupRadius() {
  return (
    <div className="flex flex-col gap-4">
      <CheckboxGroup radius="sm" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup radius="md" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup radius="lg" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup radius="full" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>

      <CheckboxGroup radius="none" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Checkbox value="soccer">Soccer</Checkbox>
        <Checkbox value="baseball">Baseball</Checkbox>
        <Checkbox value="basketball">Basketball</Checkbox>
      </CheckboxGroup>
    </div>
  );
}
`;

export const radius = { code };
