const code = `
import { Select, SelectItem } from "#/ui";

function SelectInvalid() {
  return (
    <Select isInvalid errorMessage="This is an error message." label="Favorite Animal" description="Lorem ipsum dolor sit amet.">
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

export const invalid = { code };
