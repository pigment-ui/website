const code = `
import { Button } from "#/ui";

function ButtonColor() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        <Button color="default" variant="solid">
          Click me
        </Button>
        <Button color="default" variant="soft">
          Click me
        </Button>
        <Button color="default" variant="light">
          Click me
        </Button>
        <Button color="default" variant="bordered">
          Click me
        </Button>
        <Button color="default" variant="faded">
          Click me
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button color="info" variant="solid">
          Click me
        </Button>
        <Button color="info" variant="soft">
          Click me
        </Button>
        <Button color="info" variant="light">
          Click me
        </Button>
        <Button color="info" variant="bordered">
          Click me
        </Button>
        <Button color="info" variant="faded">
          Click me
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button color="success" variant="solid">
          Click me
        </Button>
        <Button color="success" variant="soft">
          Click me
        </Button>
        <Button color="success" variant="light">
          Click me
        </Button>
        <Button color="success" variant="bordered">
          Click me
        </Button>
        <Button color="success" variant="faded">
          Click me
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button color="warning" variant="solid">
          Click me
        </Button>
        <Button color="warning" variant="soft">
          Click me
        </Button>
        <Button color="warning" variant="light">
          Click me
        </Button>
        <Button color="warning" variant="bordered">
          Click me
        </Button>
        <Button color="warning" variant="faded">
          Click me
        </Button>
      </div>

      <div className="flex flex-wrap gap-4">
        <Button color="error" variant="solid">
          Click me
        </Button>
        <Button color="error" variant="soft">
          Click me
        </Button>
        <Button color="error" variant="light">
          Click me
        </Button>
        <Button color="error" variant="bordered">
          Click me
        </Button>
        <Button color="error" variant="faded">
          Click me
        </Button>
      </div>
    </div>
  );
}
`;

export const color = { code };
