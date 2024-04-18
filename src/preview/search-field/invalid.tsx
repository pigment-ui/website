const code = `
import { SearchField } from "#/ui";

function SearchFieldInvalid() {
  return <SearchField isInvalid errorMessage="This is an error message." label="Search" description="Lorem ipsum dolor sit amet." />;
}
`;

export const invalid = { code };
