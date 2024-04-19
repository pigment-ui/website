const code = `
import { ListBox, ListBoxItem } from "#/ui";

function ListBoxAsCard() {
  return (
    <ListBox asCard={false} aria-label="Favorite animal" selectionMode="single" className="w-64">
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

export const asCard = { code };
