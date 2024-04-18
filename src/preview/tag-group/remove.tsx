import { useListData } from "@react-stately/data";

const code = `
import { Tag, TagGroup } from "#/ui";
import { useListData } from "@react-stately/data";

function TagGroupColor() {
  const list = useListData({
    initialItems: [
      { id: 1, name: "News" },
      { id: 2, name: "Travel" },
      { id: 3, name: "Gaming" },
      { id: 4, name: "Shopping" },
    ],
  });

  return (
    <TagGroup
      items={list.items}
      onRemove={(keys) => list.remove(...keys)}
      renderEmptyState={() => 'No categories.'}
      selectionMode="multiple"
      label="Categories"
      description="Lorem ipsum dolor sit amet."
    >
      {(item) => <Tag>{item.name}</Tag>}
    </TagGroup>
  );
}
`;

export const remove = { code, scope: { useListData } };
