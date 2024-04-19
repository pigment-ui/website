import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "#/ui";
import { PinIcon, UserIcon } from "lucide-react";

function NumberFieldContent() {
  return <NumberField startContent={<UserIcon />} endContent={<PinIcon />} label="Width" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
