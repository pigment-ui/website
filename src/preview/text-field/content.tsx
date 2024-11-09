import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "pigment-ui";
import { PinIcon, UserIcon } from "lucide-react";

function TextFieldContent() {
  return <TextField startContent={<UserIcon />} endContent={<PinIcon />} label="First name" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
