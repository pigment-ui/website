const code = `
import { Select, SelectItem } from "pigment-ui";

function SelectRadius() {
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
      <Select radius="sm" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>

      <Select radius="md" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>

      <Select radius="lg" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
      
      <Select radius="full" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
      
      <Select radius="none" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
    </div>
  );
}

`;

export const radius = { code };
