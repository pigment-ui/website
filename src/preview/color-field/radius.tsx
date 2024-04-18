const code = `
import { ColorField } from "#/ui";

function ColorFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <ColorField radius="sm" label="Color" description="Lorem ipsum dolor sit amet." />
      <ColorField radius="md" label="Color" description="Lorem ipsum dolor sit amet." />
      <ColorField radius="lg" label="Color" description="Lorem ipsum dolor sit amet." />
      <ColorField radius="full" label="Color" description="Lorem ipsum dolor sit amet." />
      <ColorField radius="none" label="Color" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const radius = { code };
