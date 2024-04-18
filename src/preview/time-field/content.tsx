import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "#/ui";
import { PinIcon, UserIcon } from "lucide-react";

function TimeFieldContent() {
  return <TimeField startContent={<UserIcon />} endContent={<PinIcon />} label="Event time" description="Lorem ipsum dolor sit amet." />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
