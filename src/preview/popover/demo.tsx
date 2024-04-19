import { DialogTrigger } from "react-aria-components";

const code = `
import { Button, Popover } from "#/ui";
import { DialogTrigger } from "react-aria-components";

function PopoverDemo() {
  return (
    <DialogTrigger>
      <Button>Click me</Button>
      <Popover>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, quos?</p>
      </Popover>
    </DialogTrigger>
  );
}
`;

export const demo = { code, scope: { DialogTrigger } };
