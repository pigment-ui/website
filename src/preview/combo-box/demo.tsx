const code = `
import { ComboBox, ComboBoxItem } from "pigment-ui";

function ComboBoxDemo() {
  return (
    <ComboBox label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
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

export const demo = { code };
