const code = `
import { Button, Menu, MenuItem, MenuTrigger } from "pigment-ui";

function MenuIndividual() {
  return (
    <MenuTrigger>
      <Button>Click me</Button>
      <Menu color="info" onAction={alert} className="w-64">
        <MenuItem id="open">Open</MenuItem>
        <MenuItem id="rename">Rename…</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuItem id="share">Share…</MenuItem>
        <MenuItem id="delete" color="error">Delete…</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
`;

export const colorIndividual = { code };
