import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "pigment-ui";
import { PinIcon, UserIcon } from "lucide-react";

function ColorFieldContent() {
  return <ColorField startContent={<UserIcon />} endContent={<PinIcon />} label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
