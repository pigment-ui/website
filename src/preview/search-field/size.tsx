const code = `
import { SearchField } from "#/ui";

function SearchFieldSize() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField size="sm" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
      <SearchField size="md" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
      <SearchField size="lg" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const size = { code };
