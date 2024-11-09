import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Button } from "pigment-ui";
import { PinIcon, UserIcon } from "lucide-react";

function SearchFieldContent() {
  return <SearchField startContent={<UserIcon />} endContent={<PinIcon />} label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />;
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
