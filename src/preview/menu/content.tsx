import { MenuTrigger } from "react-aria-components";
import { TrashIcon } from "lucide-react";

const code = `
import { Button, Menu, MenuItem } from "#/ui";
import { MenuTrigger } from "react-aria-components";
import { TrashIcon } from "lucide-react";

function MenuContent() {
  return (
    <MenuTrigger>
      <Button>Click me</Button>
      <Menu onAction={alert} className="w-64">
        <MenuItem id="open">Open</MenuItem>
        <MenuItem id="rename">Rename…</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuItem id="share">Share…</MenuItem>
        <MenuItem startContent={<TrashIcon />} color="error" id="delete">Delete…</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
`;

export const content = { code, scope: { MenuTrigger, TrashIcon } };
