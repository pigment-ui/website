const code = `
import { ListBox, ListBoxItem } from "pigment-ui";

function ListBoxSize() {
  return (
    <div className="flex flex-col gap-4">
      <ListBox size="sm" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>

      <ListBox size="md" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>

      <ListBox size="lg" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>
    </div>
  );
}
`;

export const size = { code };
