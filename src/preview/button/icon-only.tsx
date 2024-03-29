import { Button } from "#/ui/button";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isIconOnly variant="solid">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="soft">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="light">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="bordered">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="faded">
        <DrawingPinFilledIcon />
      </Button>
    </div>
  );
}

const code = `
import { Button } from "#/ui/button";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

function ButtonIconOnly() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isIconOnly variant="solid">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="soft">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="light">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="bordered">
        <DrawingPinFilledIcon />
      </Button>
      <Button isIconOnly variant="faded">
        <DrawingPinFilledIcon />
      </Button>
    </div>
  );
}
`;

export const iconOnly = { code, preview: <ButtonIconOnly /> };
