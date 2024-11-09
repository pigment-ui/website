const code = `
import { Tag, TagGroup } from "pigment-ui";

function TagGroupRadius() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup radius="sm" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup radius="md" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup radius="lg" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup radius="full" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup radius="none" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>
    </div>
  );
}
`;

export const radius = { code };
