const code = `
import { Select, SelectItem } from "pigment-ui";

function SelectColorIndividual() {
  return (
    <Select color="info" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <SelectItem>Aardvark</SelectItem>
      <SelectItem>Cat</SelectItem>
      <SelectItem>Dog</SelectItem>
      <SelectItem>Kangaroo</SelectItem>
      <SelectItem>Panda</SelectItem>
      <SelectItem color="success">Snake</SelectItem>
    </Select>
  );
}
`;

export const colorIndividual = { code };
