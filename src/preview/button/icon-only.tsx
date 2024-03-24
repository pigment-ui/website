import { Button } from "#/ui/button";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

function ButtonIconOnly() {
  return (
    <Button isIconOnly>
      <DrawingPinFilledIcon />
    </Button>
  );
}

const code = `
import { Button } from "#/ui/button";
import { DrawingPinFilledIcon } from "@radix-ui/react-icons";

function ButtonIconOnly() {
  return (
    <Button isIconOnly>
      <DrawingPinFilledIcon />
    </Button>
  );
}
`;

export const iconOnly = { code, preview: <ButtonIconOnly /> };
