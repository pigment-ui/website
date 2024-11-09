const code = `
import { Tag, TagGroup } from "pigment-ui";

function TagGroupSize() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup size="sm" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup size="md" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup size="lg" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>
    </div>
  );
}
`;

export const size = { code };
