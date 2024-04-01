import { ComboBox, ComboBoxItem } from "#/ui/combo-box";

function ComboBoxDemo() {
  return (
    <ComboBox label="Favorite Animal">
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem>Snake</ComboBoxItem>
    </ComboBox>
  );
}

const code = `
import { ComboBox, ComboBoxItem } from "#/ui/combo-box";

function ComboBoxDemo() {
  return (
    <ComboBox label="Favorite Animal">
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

export const demo = { code, preview: <ComboBoxDemo /> };
