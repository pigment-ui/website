const code = `
import { Radio, RadioGroup } from "#/ui";

function RadioGroupOrientation() {
  return (
    <RadioGroup orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Radio value="soccer">Soccer</Radio>
      <Radio value="baseball">Baseball</Radio>
      <Radio value="basketball">Basketball</Radio>
    </RadioGroup>
  );
}
`;

export const orientation = { code };
