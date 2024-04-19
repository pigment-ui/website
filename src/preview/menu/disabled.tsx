import { MenuTrigger } from "react-aria-components";

const code = `
import { Button, Menu, MenuItem } from "#/ui";
import { MenuTrigger } from "react-aria-components";

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

export const disabled = { code, scope: { MenuTrigger } };
