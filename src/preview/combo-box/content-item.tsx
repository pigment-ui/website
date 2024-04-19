import { CatIcon, DogIcon } from "lucide-react";

const code = `
import { ComboBox, ComboBoxItem } from "#/ui";
import { CatIcon, DogIcon } from "lucide-react";

function ComboBoxContentItem() {
  return (
    <ComboBox label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem startContent={<CatIcon />}>Cat</ComboBoxItem>
      <ComboBoxItem endContent={<DogIcon />}>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </ComboBox>
  );
}
`;

export const contentItem = { code, scope: { CatIcon, DogIcon } };
