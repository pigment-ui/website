const code = `
import { Button } from "pigment-ui";

function ButtonLoading() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button isLoading variant="solid">
        Click me
      </Button>
      <Button isLoading variant="soft">
        Click me
      </Button>
      <Button isLoading variant="light">
        Click me
      </Button>
      <Button isLoading variant="bordered">
        Click me
      </Button>
      <Button isLoading variant="faded">
        Click me
      </Button>
    </div>
  );
}
`;

export const loading = { code };
