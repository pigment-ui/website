const code = `
import { Separator } from "#/ui";

function SeparatorDemo() {
  return (
    <div className="w-96 flex flex-col gap-16">
      <Separator size="sm" />
      <Separator size="md" />
      <Separator size="lg" />
    </div>
  );
}
`;

export const size = { code };
