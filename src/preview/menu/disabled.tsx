const code = `
import { Button, Menu, MenuItem, MenuTrigger } from "pigment-ui";

function MenuDisabled() {
  return (
    <MenuTrigger>
      <Button>Click me</Button>
      <Menu disabledKeys={["delete"]} onAction={alert} className="w-64">
        <MenuItem id="open">Open</MenuItem>
        <MenuItem id="rename">Rename…</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuItem id="share">Share…</MenuItem>
        <MenuItem id="delete">Delete…</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
`;

export const disabled = { code };
