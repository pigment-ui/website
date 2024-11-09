const code = `
import { ComboBox, ComboBoxItem } from "pigment-ui";

function ComboBoxColorIndividual() {
  return (
    <ComboBox color="info" label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
      <ComboBoxItem>Aardvark</ComboBoxItem>
      <ComboBoxItem>Cat</ComboBoxItem>
      <ComboBoxItem>Dog</ComboBoxItem>
      <ComboBoxItem>Kangaroo</ComboBoxItem>
      <ComboBoxItem>Panda</ComboBoxItem>
      <ComboBoxItem color="success">Snake</ComboBoxItem>
    </ComboBox>
  );
}
`;

export const colorIndividual = { code };
