const code = `
import { Radio, RadioGroup } from "#/ui";

function RadioGroupSize() {
  return (
    <div className="flex flex-col gap-4">
      <RadioGroup size="sm" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>

      <RadioGroup size="md" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>

      <RadioGroup size="lg" orientation="horizontal" label="Favorite sports" description="Lorem ipsum dolor sit amet.">
        <Radio value="soccer">Soccer</Radio>
        <Radio value="baseball">Baseball</Radio>
        <Radio value="basketball">Basketball</Radio>
      </RadioGroup>
    </div>
  );
}
`;

export const size = { code };
