const code = `
import { ListBox, ListBoxItem } from "#/ui";

function ListBoxColor() {
  return (
    <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4">
      <ListBox color="default" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>

      <ListBox color="primary" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>

      <ListBox color="info" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>

      <ListBox color="success" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>

      <ListBox color="warning" aria-label="Favorite animal" selectionMode="single" className="w-64">
        <ListBoxItem>Aardvark</ListBoxItem>
        <ListBoxItem>Cat</ListBoxItem>
        <ListBoxItem>Dog</ListBoxItem>
        <ListBoxItem>Kangaroo</ListBoxItem>
        <ListBoxItem>Panda</ListBoxItem>
        <ListBoxItem>Snake</ListBoxItem>
      </ListBox>

      <ListBox color="error" aria-label="Favorite animal" selectionMode="single" className="w-64">
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

export const color = { code };
