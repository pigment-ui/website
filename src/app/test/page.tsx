import { ComboBox } from "#/ui/combo-box";
import { ListBox, ListBoxItem } from "#/ui/list-box";

export default function Page() {
  return (
    <div className="container py-32">
      <div className="space-y-16">
        <ComboBox label="Lorem ipsum" description="Dolor sit amet">
          <ListBoxItem>qweqwe</ListBoxItem>
          <ListBoxItem>asdasd</ListBoxItem>
          <ListBoxItem>zxczxc</ListBoxItem>
        </ComboBox>

        <ListBox>
          <ListBoxItem>qweqwe</ListBoxItem>
          <ListBoxItem>asdasd</ListBoxItem>
          <ListBoxItem>zxczxc</ListBoxItem>
        </ListBox>
      </div>
    </div>
  );
}
