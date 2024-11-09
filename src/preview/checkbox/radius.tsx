const code = `
import { Checkbox } from "pigment-ui";

function CheckboxRadius() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox radius="sm">Unsubscribe</Checkbox>
      <Checkbox radius="md">Unsubscribe</Checkbox>
      <Checkbox radius="lg">Unsubscribe</Checkbox>
      <Checkbox radius="full">Unsubscribe</Checkbox>
      <Checkbox radius="none">Unsubscribe</Checkbox>
    </div>
  );
}
`;

export const radius = { code };
