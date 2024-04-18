import { TooltipTrigger } from "react-aria-components";

const code = `
import { Button, Tooltip } from "#/ui";
import { TooltipTrigger } from "react-aria-components";

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

export const demo = { code, scope: { TooltipTrigger } };
