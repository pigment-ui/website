const code = `
import { ListBox, ListBoxItem } from "pigment-ui";

function ListBoxDemo() {
  return (
    <ListBox aria-label="Favorite animal" selectionMode="single" className="w-64">
      <ListBoxItem>Aardvark</ListBoxItem>
      <ListBoxItem>Cat</ListBoxItem>
      <ListBoxItem>Dog</ListBoxItem>
      <ListBoxItem>Kangaroo</ListBoxItem>
      <ListBoxItem>Panda</ListBoxItem>
      <ListBoxItem>Snake</ListBoxItem>
    </ListBox>
  );
}
`;

export const demo = { code };
