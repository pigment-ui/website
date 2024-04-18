const code = `
import { Checkbox } from "#/ui";

function CheckboxGroupStyleSlots() {
  return <Checkbox classNames={{ base: "p-4 bg-info-100 rounded-xl", self: "bg-info-500 border-info-500" }}>Unsubscribe</Checkbox>;
}
`;

export const styleSlots = { code };
