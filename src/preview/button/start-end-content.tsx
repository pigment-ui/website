import { Button } from "#/ui/button";
import { PinIcon, UserIcon } from "lucide-react";

function ButtonStartEndContent() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button startContent={<UserIcon />}>Click me</Button>
      <Button endContent={<PinIcon />}>Click me</Button>
      <Button startContent={<UserIcon />} endContent={<PinIcon />}>
        Click me
      </Button>
    </div>
  );
}

const code = `
import { Button } from "#/ui/button";
import { PinIcon, UserIcon } from "lucide-react";

function ButtonStartEndContent() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button startContent={<UserIcon />}>Click me</Button>
      <Button endContent={<PinIcon />}>Click me</Button>
      <Button startContent={<UserIcon />} endContent={<PinIcon />}>
        Click me
      </Button>
    </div>
  );
}
`;

export const startEndContent = { code, preview: <ButtonStartEndContent /> };
