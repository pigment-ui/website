import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { DateField } from "pigment-ui";
import { PinIcon, UserIcon } from "lucide-react";

function DateFieldContent() {
  return <DateField startContent={<UserIcon />} endContent={<PinIcon />} label="Birth date" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
