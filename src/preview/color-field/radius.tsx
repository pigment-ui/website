const code = `
import { ColorField } from "pigment-ui";

function ColorFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField radius="sm" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
      <ColorField radius="md" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
      <ColorField radius="lg" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
      <ColorField radius="full" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
      <ColorField radius="none" label="Color" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const radius = { code };
