const code = `
import { Button, Popover, PopoverTrigger } from "pigment-ui";

function PopoverDemo() {
  return (
    <PopoverTrigger>
      <Button>Click me</Button>
      <Popover>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, quos?</p>
      </Popover>
    </PopoverTrigger>
  );
}
`;

export const demo = { code };
