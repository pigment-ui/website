const code = `
import { Select, SelectItem } from "#/ui";

function SelectValidation() {
  return (
    <form className="space-y-4">
      <Select isRequired label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
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
