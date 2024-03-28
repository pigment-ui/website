import { TextField } from "#/ui/text-field";
import { ComboBox } from "#/ui/combo-box";
import { ListBoxItem } from "#/ui/list-box";

export default function Page() {
  return (
    <div className="container py-32">
      <div className="space-y-16">
        <TextField label="Lorem ipsum" description="Dolor sit amet" value="qweqweqweqwe" />

        <ComboBox label="Lorem ipsum" description="Dolor sit amet" endContent="asdasd">
          <ListBoxItem>qweqwe</ListBoxItem>
          <ListBoxItem>asdasd</ListBoxItem>
          <ListBoxItem>zxczxc</ListBoxItem>
        </ComboBox>
      </div>
    </div>
  );
}
