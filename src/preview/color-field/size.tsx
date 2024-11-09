const code = `
import { ColorField } from "pigment-ui";

function ColorFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField size="sm" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
      <ColorField size="md" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
      <ColorField size="lg" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const size = { code };
