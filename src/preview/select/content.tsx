import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { Select, SelectItem } from "pigment-ui";
import { PinIcon, UserIcon } from "lucide-react";

function SelectContent() {
  return (
    <Select startContent={<UserIcon />} endContent={<PinIcon />} label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <SelectItem>Aardvark</SelectItem>
      <SelectItem>Cat</SelectItem>
      <SelectItem>Dog</SelectItem>
      <SelectItem>Kangaroo</SelectItem>
      <SelectItem>Panda</SelectItem>
      <SelectItem>Snake</SelectItem>
    </Select>
  );
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
