const code = `
import { Radio, RadioGroup } from "pigment-ui";

function RadioGroupDisabledIndividual() {
  return (
    <RadioGroup label="Favorite sports" description="Lorem ipsum dolor sit amet.">
      <Radio value="soccer">Soccer</Radio>
      <Radio value="baseball" isDisabled>Baseball</Radio>
      <Radio value="basketball">Basketball</Radio>
    </RadioGroup>
  );
}
`;

export const disabledIndividual = { code };
