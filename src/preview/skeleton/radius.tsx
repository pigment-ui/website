const code = `
import { Skeleton } from "#/ui";

function SkeletonRadius() {
  return (
    <div className="w-96 flex flex-col gap-4">
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
