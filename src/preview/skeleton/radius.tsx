const code = `
import { Skeleton } from "pigment-ui";

function SkeletonRadius() {
  return (
    <div className="w-64 space-y-4">
      <Skeleton radius="sm" className="h-4" />
      <Skeleton radius="md" className="h-4" />
      <Skeleton radius="lg" className="h-4" />
      <Skeleton radius="full" className="h-4" />
      <Skeleton radius="none" className="h-4" />
    </div>
  );
}
`;

export const radius = { code };
