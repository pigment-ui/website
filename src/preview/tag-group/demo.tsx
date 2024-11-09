const code = `
import { Tag, TagGroup } from "pigment-ui";

function TagGroupDemo() {
  return (
    <TagGroup label="Categories" description="Lorem ipsum dolor sit amet.">
      <Tag>News</Tag>
      <Tag>Travel</Tag>
      <Tag>Gaming</Tag>
      <Tag>Shopping</Tag>
    </TagGroup>
  );
}
`;

export const demo = { code };
