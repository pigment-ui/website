const code = `
import { Skeleton } from "#/ui";

function SkeletonAnimation() {
  return (
    <div className="w-96 flex flex-col gap-4">
      <Skeleton animation="pulse" className="h-4" />
      <Skeleton animation="none" className="h-4" />
    </div>
  );
}
`;

export const animation = { code };
