const code = `
import { Select, SelectItem } from "pigment-ui";

function SelectColor() {
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
      <Select color="default" label={<div className="text-default-1000">Favorite Animal</div>} description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>

      <Select color="primary" label={<div className="text-primary-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>

      <Select color="info" label={<div className="text-info-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
      
      <Select color="success" label={<div className="text-success-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
      
      <Select color="warning" label={<div className="text-warning-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
      
      <Select color="error" label={<div className="text-error-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet." className="w-64">
        {renderSelectContent}
      </Select>
    </div>
  );
}

`;

export const color = { code };
