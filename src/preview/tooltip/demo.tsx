const code = `
import { Button, Tooltip, TooltipTrigger } from "pigment-ui";

function TooltipDemo() {
  return (
    <TooltipTrigger>
      <Button>Hover me</Button>
      <Tooltip>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Molestias, quos?</p>
      </Tooltip>
    </TooltipTrigger>
  );
}
`;

export const demo = { code };
