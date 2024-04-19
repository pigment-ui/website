const code = `
import { Select, SelectItem } from "#/ui";

function SelectDisabledIndividual() {
  return (
    <Select disabledKeys={["Dog"]} label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
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

export const disabledIndividual = { code };
