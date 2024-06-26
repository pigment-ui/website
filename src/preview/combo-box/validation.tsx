const code = `
import { ComboBox, ComboBoxItem } from "#/ui";

function ComboBoxValidation() {
  return (
    <form className="space-y-4">
      <ComboBox isRequired label="Favorite Animal" description="Lorem ipsum dolor sit amet." className="w-64">
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>
      <Button type="submit">Submit</Button>
    </form>
  );
}
`;

export const validation = { code };
