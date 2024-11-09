import { ShareIcon, TrashIcon } from "lucide-react";

const code = `
import { Button, Menu, MenuItem, MenuTrigger } from "pigment-ui";
import { TrashIcon, ShareIcon } from "lucide-react";

function MenuContent() {
  return (
    <MenuTrigger>
      <Button>Click me</Button>
      <Menu onAction={alert} className="w-64">
        <MenuItem id="open">Open</MenuItem>
        <MenuItem id="rename">Rename…</MenuItem>
        <MenuItem id="duplicate">Duplicate</MenuItem>
        <MenuItem endContent={<ShareIcon />} id="share">Share…</MenuItem>
        <MenuItem startContent={<TrashIcon />} color="error" id="delete">Delete…</MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
`;

export const content = { code, scope: { TrashIcon, ShareIcon } };
