const code = `
import { Menu, MenuItem, MenuTrigger } from "pigment-ui";

function MenuSize() {
  const renderMenuContent = (
    <>
      <MenuItem id="open">Open</MenuItem>
      <MenuItem id="rename">Rename…</MenuItem>
      <MenuItem id="duplicate">Duplicate</MenuItem>
      <MenuItem id="share">Share…</MenuItem>
      <MenuItem id="delete">Delete…</MenuItem>
    </>
  );

  return (
    <div className="flex flex-wrap gap-4">
      <MenuTrigger>
        <Button>Size sm</Button>
        <Menu size="sm" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button>Size md</Button>
        <Menu size="md" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button>Size lg</Button>
        <Menu size="lg" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>
    </div>
  );
}
`;

export const size = { code };
