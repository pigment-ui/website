import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "pigment-ui";
import { PinIcon, UserIcon } from "lucide-react";

function TimeFieldContent() {
  return <TimeField startContent={<UserIcon />} endContent={<PinIcon />} label="Event time" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
