const code = `
import { ListBox, ListBoxItem } from "#/ui";

function ListBoxColorIndividual() {
  return (
    <ListBox color="info" aria-label="Favorite animal" selectionMode="single" className="w-64">
      <ListBoxItem>Aardvark</ListBoxItem>
      <ListBoxItem>Cat</ListBoxItem>
      <ListBoxItem>Dog</ListBoxItem>
      <ListBoxItem>Kangaroo</ListBoxItem>
      <ListBoxItem>Panda</ListBoxItem>
      <ListBoxItem color="success">Snake</ListBoxItem>
    </ListBox>
  );
}
`;

export const colorIndividual = { code };
