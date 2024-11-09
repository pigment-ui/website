const code = `
import { ProgressBar } from "pigment-ui";

function ProgressBarDemo() {
  return (
    <ProgressBar label="Loading…" value={80} className="w-full" />
  );
}
`;

export const demo = { code };
