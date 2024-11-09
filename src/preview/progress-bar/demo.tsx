const code = `
import { ProgressBar } from "pigment-ui";

function ProgressBarDemo() {
  return (
    <ProgressBar label="Loading…" value={80} className="w-64" />
  );
}
`;

export const demo = { code };
