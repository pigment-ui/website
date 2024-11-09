const code = `
import { Separator } from "pigment-ui";

function SeparatorDemo() {
  return (
    <div className="w-64 space-y-16">
      <Separator size="sm" />
      <Separator size="md" />
      <Separator size="lg" />
    </div>
  );
}
`;

export const size = { code };
