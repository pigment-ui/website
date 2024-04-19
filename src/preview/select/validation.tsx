const code = `
import { Select, SelectItem } from "#/ui";

function SelectValidation() {
  return (
    <form className="w-64 space-y-4">
      <Select isRequired label="Favorite Animal" description="Lorem ipsum dolor sit amet.">
        <SelectItem>Aardvark</SelectItem>
        <SelectItem>Cat</SelectItem>
        <SelectItem>Dog</SelectItem>
        <SelectItem>Kangaroo</SelectItem>
        <SelectItem>Panda</SelectItem>
        <SelectItem>Snake</SelectItem>
      </Select>
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
