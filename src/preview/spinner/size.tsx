const code = `
import { Spinner } from "#/ui";

function SpinnerSize() {
  return (
    <div className="flex gap-4">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}
`;

export const size = { code };
