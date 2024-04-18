const code = `
import { Checkbox } from "#/ui";

function CheckboxSize() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox size="sm">Unsubscribe</Checkbox>
      <Checkbox size="md">Unsubscribe</Checkbox>
      <Checkbox size="lg">Unsubscribe</Checkbox>
    </div>
  );
}
`;

export const size = { code };
