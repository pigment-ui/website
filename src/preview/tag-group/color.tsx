const code = `
import { Tag, TagGroup } from "pigment-ui";

function TagGroupColor() {
  return (
    <div className="flex flex-col gap-4">
      <TagGroup color="default" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup color="primary" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup color="info" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>

      <TagGroup color="success" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>
      
      <TagGroup color="warning" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>
      
      <TagGroup color="error" selectionMode="multiple" label="Categories" description="Lorem ipsum dolor sit amet.">
        <Tag>News</Tag>
        <Tag>Travel</Tag>
        <Tag>Gaming</Tag>
        <Tag>Shopping</Tag>
      </TagGroup>      
    </div>
  );
}
`;

export const color = { code };
