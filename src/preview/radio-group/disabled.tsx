const code = `
import { Radio, RadioGroup } from "pigment-ui";

function RadioGroupDisabled() {
  return (
    <RadioGroup isDisabled label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Radio value="soccer">Soccer</Radio>
      <Radio value="baseball">Baseball</Radio>
      <Radio value="basketball">Basketball</Radio>
    </RadioGroup>
  );
}
`;

export const disabled = { code };
