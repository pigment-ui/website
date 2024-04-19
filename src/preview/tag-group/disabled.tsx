const code = `
import { Tag, TagGroup } from "#/ui";

function TagGroupDisabled() {
  return (
    <TagGroup disabledKeys={["Travel"]} selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
      <Tag>News</Tag>
      <Tag>Travel</Tag>
      <Tag>Gaming</Tag>
      <Tag>Shopping</Tag>
    </TagGroup>
  );
}
`;

export const disabled = { code };
