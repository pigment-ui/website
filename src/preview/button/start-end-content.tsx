import { Button } from "#/ui/button";
import { DrawingPinFilledIcon, PersonIcon } from "@radix-ui/react-icons";

function ButtonStartEndContent() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button startContent={<PersonIcon />}>Click me</Button>
      <Button endContent={<DrawingPinFilledIcon />}>Click me</Button>
      <Button startContent={<PersonIcon />} endContent={<DrawingPinFilledIcon />}>
        Click me
      </Button>
    </div>
  );
}

const code = `
import { Button } from "#/ui/button";
import { DrawingPinFilledIcon, PersonIcon } from "@radix-ui/react-icons";

function ButtonStartAndEndContent() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button startContent={<PersonIcon />}>Click me</Button>
      <Button endContent={<DrawingPinFilledIcon />}>Click me</Button>
      <Button startContent={<PersonIcon />} endContent={<DrawingPinFilledIcon />}>
        Click me
      </Button>
    </div>
  );
}
`;

export const startEndContent = { code, preview: <ButtonStartEndContent /> };
