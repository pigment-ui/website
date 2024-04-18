const code = `
import { SearchField } from "#/ui";

function SearchFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField radius="sm" label="Search" description="Lorem ipsum dolor sit amet." />
      <SearchField radius="md" label="Search" description="Lorem ipsum dolor sit amet." />
      <SearchField radius="lg" label="Search" description="Lorem ipsum dolor sit amet." />
      <SearchField radius="full" label="Search" description="Lorem ipsum dolor sit amet." />
      <SearchField radius="none" label="Search" description="Lorem ipsum dolor sit amet." />
    </div>
  );
}
`;

export const radius = { code };
