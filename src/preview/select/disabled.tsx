const code = `
import { Select, SelectItem } from "#/ui";

function SelectDisabled() {
  return (
    <Select isDisabled label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <SelectItem>Aardvark</SelectItem>
      <SelectItem>Cat</SelectItem>
      <SelectItem>Dog</SelectItem>
      <SelectItem>Kangaroo</SelectItem>
      <SelectItem>Panda</SelectItem>
      <SelectItem>Snake</SelectItem>
    </Select>
  );
}
`;

export const disabled = { code };
