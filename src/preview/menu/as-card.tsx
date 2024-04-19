const code = `
import { Menu, MenuItem } from "#/ui";

function MenuAsCard() {
  return (
    <Menu asCard={false} aria-label="Favorite animal" selectionMode="single" className="w-64">
      <MenuItem>Aardvark</MenuItem>
      <MenuItem>Cat</MenuItem>
      <MenuItem>Dog</MenuItem>
      <MenuItem>Kangaroo</MenuItem>
      <MenuItem>Panda</MenuItem>
      <MenuItem>Snake</MenuItem>
    </Menu>
  );
}
`;

export const asCard = { code };
