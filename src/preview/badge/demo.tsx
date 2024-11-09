import { BellIcon } from "lucide-react";

const code = `
import { Badge } from "pigment-ui";
import { BellIcon } from "lucide-react";

function BadgeDemo() {
  return (
    <Badge content="99+">
      <BellIcon className="size-8" />
    </Badge>
  );
}
`;

export const demo = { code, scope: { BellIcon } };
