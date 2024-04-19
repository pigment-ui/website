import { RotateCcwIcon, TrashIcon } from "lucide-react";

const code = `
import { ListBox, ListBoxItem } from "#/ui";
import { RotateCcwIcon, TrashIcon } from "lucide-react";

function ListBoxContent() {
  return (
    <ListBox color="info" aria-label="Favorite animal" onAction={(key) => alert(key)} className="w-64">
      <ListBoxItem>Aardvark</ListBoxItem>
      <ListBoxItem>Cat</ListBoxItem>
      <ListBoxItem>Dog</ListBoxItem>
      <ListBoxItem>Kangaroo</ListBoxItem>
      <ListBoxItem>Panda</ListBoxItem>
      <ListBoxItem>Snake</ListBoxItem>
      <ListBoxItem color="success" endContent={<RotateCcwIcon />}>Rollback</ListBoxItem>
      <ListBoxItem color="error" startContent={<TrashIcon />}>Delete</ListBoxItem>
    </ListBox>
  );
}
`;

export const content = { code, scope: { RotateCcwIcon, TrashIcon } };
