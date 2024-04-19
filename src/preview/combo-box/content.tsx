import { PinIcon, UserIcon } from "lucide-react";

const code = `
import { ComboBox, ComboBoxItem } from "#/ui";
import { PinIcon, UserIcon } from "lucide-react";

function ComboBoxContent() {
  return (
    <ComboBox startContent={<UserIcon />} endContent={<PinIcon />} label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </ComboBox>
  );
}
`;

export const content = { code, scope: { PinIcon, UserIcon } };
