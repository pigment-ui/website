const code = `
import { Spinner } from "#/ui";

function SpinnerColor() {
  return (
    <div className="flex gap-4">
      <Spinner color="default" />
      <Spinner color="info" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="error" />
    </div>
  );
}
`;

export const color = { code };
