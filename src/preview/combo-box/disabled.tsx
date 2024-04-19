const code = `
import { ComboBox, ComboBoxItem } from "#/ui";

function ComboBoxDisabled() {
  return (
    <ComboBox isDisabled label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </ComboBox>
  );
}
`;

export const disabled = { code };
