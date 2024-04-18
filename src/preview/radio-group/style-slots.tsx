const code = `
import { Radio } from "#/ui";

function RadioGroupStyleSlots() {
  return <Radio classNames={{ base: "p-4 bg-info-100 rounded-xl", self: "bg-info-500 border-info-500" }}>Unsubscribe</Radio>;
}
`;

export const styleSlots = { code };
