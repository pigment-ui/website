const code = `
import { ColorField } from "pigment-ui";

function ColorFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField size="sm" label="Color" description="Lorem ipsum dolor sit amet." />
      <ColorField size="md" label="Color" description="Lorem ipsum dolor sit amet." />
      <ColorField size="lg" label="Color" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const size = { code };
