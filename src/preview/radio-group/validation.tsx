const code = `
import { Button, Radio, RadioGroup } from "pigment-ui";

function RadioGroupValidation() {
  return (
    <form className="space-y-4 w-64">
      <RadioGroup isRequired label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
