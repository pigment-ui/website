import { MenuTrigger } from "react-aria-components";

const code = `
import { Menu, MenuItem } from "#/ui";
import { MenuTrigger } from "react-aria-components";

function MenuColor() {
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
        <Button color="default">Color default</Button>
        <Menu color="default" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button color="primary">Color primary</Button>
        <Menu color="primary" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button color="info">Color info</Button>
        <Menu color="info" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button color="success">Color success</Button>
        <Menu color="success" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button color="warning">Color warning</Button>
        <Menu color="warning" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>

      <MenuTrigger>
        <Button color="error">Color error</Button>
        <Menu color="error" onAction={alert} className="w-64">
          {renderMenuContent}
        </Menu>
      </MenuTrigger>
    </div>
  );
}
`;

export const color = { code, scope: { MenuTrigger } };
