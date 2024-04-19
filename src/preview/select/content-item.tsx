import { CatIcon, DogIcon } from "lucide-react";

const code = `
import { Select, SelectItem } from "#/ui";
import { CatIcon, DogIcon } from "lucide-react";

function SelectContentItem() {
  return (
    <Select label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <SelectItem>Aardvark</SelectItem>
      <SelectItem startContent={<CatIcon />}>Cat</SelectItem>
      <SelectItem endContent={<DogIcon />}>Dog</SelectItem>
      <SelectItem>Kangaroo</SelectItem>
      <SelectItem>Panda</SelectItem>
      <SelectItem>Snake</SelectItem>
    </Select>
  );
}
`;

export const contentItem = { code, scope: { CatIcon, DogIcon } };
