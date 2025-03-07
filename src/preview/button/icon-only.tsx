import { PinIcon } from "lucide-react";

const code = `
import { Button } from "pigment-ui";
import { PinIcon } from "lucide-react";

function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isFit variant="solid">
        <PinIcon />
      </Button>
      <Button isFit variant="soft">
        <PinIcon />
      </Button>
      <Button isFit variant="light">
        <PinIcon />
      </Button>
      <Button isFit variant="bordered">
        <PinIcon />
      </Button>
      <Button isFit variant="faded">
        <PinIcon />
      </Button>
    </div>
  );
}
`;

export const iconOnly = { code, scope: { PinIcon } };
