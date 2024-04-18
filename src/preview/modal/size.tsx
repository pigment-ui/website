import { DialogTrigger } from "react-aria-components";

const code = `
import { Button, Modal, ModalBody, ModalButtons, ModalFooter, ModalHeader, ModalHeading, Separator } from "#/ui";
import { DialogTrigger } from "react-aria-components";

function ModalSize() {
  const renderModalContent = (
    <>
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
    </>
  );

  return (
    <div className="flex flex-wrap gap-4">
      <DialogTrigger>
        <Button>Size sm</Button>
        <Modal size="sm">{renderModalContent}</Modal>
      </DialogTrigger>

      <DialogTrigger>
        <Button>Size md</Button>
        <Modal size="md">{renderModalContent}</Modal>
      </DialogTrigger>

      <DialogTrigger>
        <Button>Size lg</Button>
        <Modal size="lg">{renderModalContent}</Modal>
      </DialogTrigger>
    </div>
  );
}
`;

export const size = { code, scope: { DialogTrigger } };
