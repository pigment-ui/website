const code = `
import { SearchField } from "pigment-ui";

function SearchFieldRadius() {
  return (
    <div className="flex flex-col gap-4">
      <SearchField radius="sm" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
      <SearchField radius="md" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
      <SearchField radius="lg" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
      <SearchField radius="full" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
      <SearchField radius="none" label="Search" description="Lorem ipsum dolor sit amet." className="w-64" />
    </div>
  );
}
`;

export const radius = { code };
