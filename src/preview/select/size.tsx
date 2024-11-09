const code = `
import { Select, SelectItem } from "pigment-ui";

function SelectSize() {
  const renderSelectContent = (
    <>
      <SelectItem>Aardvark</SelectItem>
      <SelectItem>Cat</SelectItem>
      <SelectItem>Dog</SelectItem>
      <SelectItem>Kangaroo</SelectItem>
      <SelectItem>Panda</SelectItem>
      <SelectItem>Snake</SelectItem>
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <Select size="sm" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>

      <Select size="md" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>

      <Select size="lg" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
    </div>
  );
}

`;

export const size = { code };
