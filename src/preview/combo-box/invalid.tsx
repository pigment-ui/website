const code = `
import { ComboBox, ComboBoxItem } from "pigment-ui";

function ComboBoxInvalid() {
  return (
    <ComboBox isInvalid errorMessage="This is an error message." label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
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

export const invalid = { code };
