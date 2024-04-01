import { ComboBox, ComboBoxItem, ComboBoxSection } from "#/ui/combo-box";

function ComboBoxSections() {
  return (
    <ComboBox label="Preferred fruit or vegetable">
      <ComboBoxSection title="Fruit">
        <ComboBoxItem>Apple</ComboBoxItem>
        <ComboBoxItem>Banana</ComboBoxItem>
        <ComboBoxItem>Orange</ComboBoxItem>
        <ComboBoxItem>Honeydew</ComboBoxItem>
        <ComboBoxItem>Grapes</ComboBoxItem>
        <ComboBoxItem>Watermelon</ComboBoxItem>
        <ComboBoxItem>Cantaloupe</ComboBoxItem>
        <ComboBoxItem>Pear</ComboBoxItem>
      </ComboBoxSection>
      <ComboBoxSection title="Vegetable">
        <ComboBoxItem>Cabbage</ComboBoxItem>
        <ComboBoxItem>Broccoli</ComboBoxItem>
        <ComboBoxItem>Carrots</ComboBoxItem>
        <ComboBoxItem>Lettuce</ComboBoxItem>
        <ComboBoxItem>Spinach</ComboBoxItem>
        <ComboBoxItem>Bok Choy</ComboBoxItem>
        <ComboBoxItem>Cauliflower</ComboBoxItem>
        <ComboBoxItem>Potatoes</ComboBoxItem>
      </ComboBoxSection>
    </ComboBox>
  );
}

const code = `
import { ComboBox, ComboBoxItem, ComboBoxSection } from "#/ui/combo-box";

function ComboBoxSections() {
  return (
    <ComboBox label="Preferred fruit or vegetable">
      <ComboBoxSection title="Fruit">
        <ComboBoxItem>Apple</ComboBoxItem>
        <ComboBoxItem>Banana</ComboBoxItem>
        <ComboBoxItem>Orange</ComboBoxItem>
        <ComboBoxItem>Honeydew</ComboBoxItem>
        <ComboBoxItem>Grapes</ComboBoxItem>
        <ComboBoxItem>Watermelon</ComboBoxItem>
        <ComboBoxItem>Cantaloupe</ComboBoxItem>
        <ComboBoxItem>Pear</ComboBoxItem>
      </ComboBoxSection>
      <ComboBoxSection title="Vegetable">
        <ComboBoxItem>Cabbage</ComboBoxItem>
        <ComboBoxItem>Broccoli</ComboBoxItem>
        <ComboBoxItem>Carrots</ComboBoxItem>
        <ComboBoxItem>Lettuce</ComboBoxItem>
        <ComboBoxItem>Spinach</ComboBoxItem>
        <ComboBoxItem>Bok Choy</ComboBoxItem>
        <ComboBoxItem>Cauliflower</ComboBoxItem>
        <ComboBoxItem>Potatoes</ComboBoxItem>
      </ComboBoxSection>
    </ComboBox>
  );
}
`;

export const sections = { code, preview: <ComboBoxSections /> };
