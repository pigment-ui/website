const code = `
import { ComboBox, ComboBoxItem } from "pigment-ui";

function ComboBoxSize() {
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
      <ComboBox size="sm" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderComboBoxContent}
      </ComboBox>

      <ComboBox size="md" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderComboBoxContent}
      </ComboBox>

      <ComboBox size="lg" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        {renderComboBoxContent}
      </ComboBox>
    </div>
  );
}

`;

export const size = { code };
