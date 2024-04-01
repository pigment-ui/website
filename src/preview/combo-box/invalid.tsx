import { ComboBox, ComboBoxItem } from "#/ui/combo-box";

function ComboBoxInvalid() {
  return (
    <ComboBox label="Favorite Animal" isInvalid>
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

function ComboBoxInvalid() {
  return (
    <ComboBox label="Favorite Animal" isInvalid>
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

export const invalid = { code, preview: <ComboBoxInvalid /> };
