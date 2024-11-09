import { CatIcon, DogIcon } from "lucide-react";

const code = `
import { ListBox, ListBoxItem } from "pigment-ui";
import { CatIcon, DogIcon } from "lucide-react";

function ListBoxContent() {
  return (
    <ListBox aria-label="Favorite animal" selectionMode="single" className="w-64">
      <ListBoxItem>Aardvark</ListBoxItem>
      <ListBoxItem startContent={<CatIcon />}>Cat</ListBoxItem>
      <ListBoxItem endContent={<DogIcon />}>Dog</ListBoxItem>
      <ListBoxItem>Kangaroo</ListBoxItem>
      <ListBoxItem>Panda</ListBoxItem>
      <ListBoxItem>Snake</ListBoxItem>
    </ListBox>
  );
}
`;

export const content = { code, scope: { CatIcon, DogIcon } };
