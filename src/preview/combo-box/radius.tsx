const code = `
import { ComboBox, ComboBoxItem } from "#/ui";

function ComboBoxRadius() {
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
      <ComboBox radius="sm" label="Favorite Animal" description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>

      <ComboBox radius="md" label="Favorite Animal" description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>

      <ComboBox radius="lg" label="Favorite Animal" description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>
      
      <ComboBox radius="full" label="Favorite Animal" description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>
      
      <ComboBox radius="none" label="Favorite Animal" description="Lorem ipsum dolor sit amet.">
        {renderComboBoxContent}
      </ComboBox>
    </div>
  );
}

`;

export const radius = { code };
