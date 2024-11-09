const code = `
import { Button, Modal, ModalTrigger, ModalBody, ModalButtons, ModalFooter, ModalHeader, ModalHeading, Separator } from "pigment-ui";

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
      <ModalTrigger>
        <Button>Size sm</Button>
        <Modal size="sm">{renderModalContent}</Modal>
      </ModalTrigger>

      <ModalTrigger>
        <Button>Size md</Button>
        <Modal size="md">{renderModalContent}</Modal>
      </ModalTrigger>

      <ModalTrigger>
        <Button>Size lg</Button>
        <Modal size="lg">{renderModalContent}</Modal>
      </ModalTrigger>
    </div>
  );
}
`;

export const size = { code };
