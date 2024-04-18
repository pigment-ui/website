import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "#/ui";
import { PinIcon, UserIcon } from "lucide-react";

function DateFieldContent() {
  return <DateField startContent={<UserIcon />} endContent={<PinIcon />} label="Birth date" description="Lorem ipsum dolor sit amet." />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
