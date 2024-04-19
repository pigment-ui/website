import { MenuTrigger } from "react-aria-components";

const code = `
import { Button, Menu, MenuItem } from "#/ui";
import { MenuTrigger } from "react-aria-components";

function MenuIndividual() {
  return (
    <MenuTrigger>
      <Button>Click me</Button>
      <Menu onAction={alert} className="w-64">
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

export const colorIndividual = { code, scope: { MenuTrigger } };
