const code = `
import { Spinner } from "pigment-ui";

function SpinnerColor() {
  return (
    <div className="flex gap-4">
      <Spinner color="default" />
      <Spinner color="primary" />
      <Spinner color="info" />
      <Spinner color="success" />
      <Spinner color="warning" />
      <Spinner color="error" />
    </div>
  );
}
`;

export const color = { code };
