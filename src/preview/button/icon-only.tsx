import { PinIcon } from "lucide-react";
import { Button } from "#/ui/button";

function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isIconOnly variant="solid">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="soft">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="light">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="bordered">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="faded">
        <PinIcon />
      </Button>
    </div>
  );
}

const code = `
import { PinIcon } from "lucide-react";
import { Button } from "#/ui/button";

function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isIconOnly variant="solid">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="soft">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="light">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="bordered">
        <PinIcon />
      </Button>
      <Button isIconOnly variant="faded">
        <PinIcon />
      </Button>
    </div>
  );
}
`;

export const iconOnly = { code, preview: <ButtonIconOnly /> };
