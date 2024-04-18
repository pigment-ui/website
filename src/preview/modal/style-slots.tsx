import { DialogTrigger } from "react-aria-components";

const code = `
import { Button, Modal, ModalBody, ModalButtons, ModalFooter, ModalHeader, ModalHeading, Separator } from "#/ui";
import { DialogTrigger } from "react-aria-components";

function ModalStyleSlots() {
  return (
    <DialogTrigger>
      <Button>Click me</Button>
      <Modal classNames={{ base: "bg-info-100", backdrop: "bg-info-500/20", closeButton: "text-error-500 bg-error-500", heading: "underline", buttons: "justify-start" }}>
        <ModalHeader>
          <ModalHeading>Lorem ipsum dolor sit amet.</ModalHeading>
        </ModalHeader>

        <Separator />

        <ModalBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto blanditiis commodi culpa dicta distinctio dolor
            dolorem ducimus eveniet id illo illum impedit, iste itaque iusto, libero magnam minima minus nesciunt nostrum numquam omnis optio
            perspiciatis quae quisquam quod repellat rerum sed suscipit ut, velit veniam vero voluptatibus voluptatum?
          </p>
        </ModalBody>

        <Separator />

        <ModalFooter>
          <ModalButtons>
            <Button variant="light">Cancel</Button>
            <Button>Click me</Button>
          </ModalButtons>
        </ModalFooter>
      </Modal>
    </DialogTrigger>
  );
}
`;

export const styleSlots = { code, scope: { DialogTrigger } };
