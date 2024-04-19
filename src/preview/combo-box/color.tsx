const code = `
import { ComboBox, ComboBoxItem } from "#/ui";

function ComboBoxColor() {
  const renderComboBoxContent = (
    <>
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </>
  );

  return (
    <div className="flex flex-col gap-4">
      <ComboBox color="default" label={<div className="text-default-1000">Favorite Animal</div>} description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>

      <ComboBox color="primary" label={<div className="text-primary-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>

      <ComboBox color="info" label={<div className="text-info-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>
      
      <ComboBox color="success" label={<div className="text-success-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>
      
      <ComboBox color="warning" label={<div className="text-warning-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>
      
      <ComboBox color="error" label={<div className="text-error-500">Favorite Animal</div>} description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>
    </div>
  );
}

`;

export const color = { code };
