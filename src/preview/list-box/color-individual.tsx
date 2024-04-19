const code = `
import { ListBox, ListBoxItem } from "#/ui";

function ListBoxColorIndividual() {
  return (
    <ListBox color="info" aria-label="Favorite animal" onAction={(key) => alert(key)} className="w-64">
      <ListBoxItem>Aardvark</ListBoxItem>
      <ListBoxItem>Cat</ListBoxItem>
      <ListBoxItem>Dog</ListBoxItem>
      <ListBoxItem>Kangaroo</ListBoxItem>
      <ListBoxItem>Panda</ListBoxItem>
      <ListBoxItem>Snake</ListBoxItem>
      <ListBoxItem color="error">Delete</ListBoxItem>
    </ListBox>
  );
}
`;

export const colorIndividual = { code };
