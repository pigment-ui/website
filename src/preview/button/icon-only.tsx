import { PinIcon } from "lucide-react";

const code = `
import { Button } from "pigment-ui";
import { PinIcon } from "lucide-react";

function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isCompact variant="solid">
        <PinIcon />
      </Button>
      <Button isCompact variant="soft">
        <PinIcon />
      </Button>
      <Button isCompact variant="light">
        <PinIcon />
      </Button>
      <Button isCompact variant="bordered">
        <PinIcon />
      </Button>
      <Button isCompact variant="faded">
        <PinIcon />
      </Button>
    </div>
  );
}
`;

export const iconOnly = { code, scope: { PinIcon } };
