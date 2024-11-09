const code = `
import { ListBoxItem, ListBox } from "pigment-ui";

function ListBoxDisabled() {
  return (
    <ListBox disabledKeys={["Dog"]} aria-label="Favorite animal" selectionMode="single" className="w-64">
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

export const disabled = { code };
