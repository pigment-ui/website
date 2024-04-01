import { ComboBox, ComboBoxItem } from "#/ui/combo-box";
import { DrawingPinFilledIcon, PersonIcon } from "@radix-ui/react-icons";

function ComboBoxStartEndContent() {
  return (
    <div className="flex flex-col gap-4">
      <ComboBox label="Favorite Animal" startContent="https://">
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>

      <ComboBox label="Favorite Animal" startContent={<PersonIcon />}>
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>

      <ComboBox label="Favorite Animal" endContent={<DrawingPinFilledIcon />}>
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>

      <ComboBox label="Favorite Animal" startContent={<PersonIcon />} endContent={<DrawingPinFilledIcon />}>
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>
    </div>
  );
}

const code = `
import { ComboBox, ComboBoxItem } from "#/ui/combo-box";
import { DrawingPinFilledIcon, PersonIcon } from "@radix-ui/react-icons";

function ComboBoxStartEndContent() {
  return (
    <div className="flex flex-col gap-4">
      <ComboBox label="Favorite Animal" startContent={<PersonIcon />}>
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>

      <ComboBox label="Favorite Animal" endContent={<DrawingPinFilledIcon />}>
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>

      <ComboBox label="Favorite Animal" startContent={<PersonIcon />} endContent={<DrawingPinFilledIcon />}>
        <ComboBoxItem>Aardvark</ComboBoxItem>
        <ComboBoxItem>Cat</ComboBoxItem>
        <ComboBoxItem>Dog</ComboBoxItem>
        <ComboBoxItem>Kangaroo</ComboBoxItem>
        <ComboBoxItem>Panda</ComboBoxItem>
        <ComboBoxItem>Snake</ComboBoxItem>
      </ComboBox>
    </div>
  );
}
`;

export const startEndContent = { code, preview: <ComboBoxStartEndContent /> };
