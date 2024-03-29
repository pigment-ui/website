import { Button } from "#/ui/button";

function ButtonDisabled() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isDisabled variant="solid">
        Click me
      </Button>
      <Button isDisabled variant="soft">
        Click me
      </Button>
      <Button isDisabled variant="light">
        Click me
      </Button>
      <Button isDisabled variant="bordered">
        Click me
      </Button>
      <Button isDisabled variant="faded">
        Click me
      </Button>
    </div>
  );
}

const code = `
import { Button } from "#/ui/button";

function ButtonDisabled() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isDisabled variant="solid">
        Click me
      </Button>
      <Button isDisabled variant="soft">
        Click me
      </Button>
      <Button isDisabled variant="light">
        Click me
      </Button>
      <Button isDisabled variant="bordered">
        Click me
      </Button>
      <Button isDisabled variant="faded">
        Click me
      </Button>
    </div>
  );
}
`;

export const disabled = { code, preview: <ButtonDisabled /> };
