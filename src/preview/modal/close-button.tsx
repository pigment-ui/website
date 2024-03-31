import { DialogTrigger } from "react-aria-components";
import { Modal, ModalBody, ModalButtons, ModalFooter, ModalHeader, ModalHeading } from "#/ui/modal";
import { Button } from "#/ui/button";
import { Separator } from "#/ui/separator";
import { Dialog } from "#/ui/dialog";

function ModalCloseButton() {
  return (
    <DialogTrigger>
      <Button>Click me</Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <>
              <ModalHeader>
                <ModalHeading>Lorem ipsum dolor sit amet.</ModalHeading>
              </ModalHeader>

              <Separator />

              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto blanditiis commodi culpa dicta distinctio
                  dolor dolorem ducimus eveniet id illo illum impedit, iste itaque iusto, libero magnam minima minus nesciunt nostrum numquam omnis
                  optio perspiciatis quae quisquam quod repellat rerum sed suscipit ut, velit veniam vero voluptatibus voluptatum?
                </p>
              </ModalBody>

              <Separator />

              <ModalFooter>
                <ModalButtons>
                  <Button variant="light" onPress={close} color="error">
                    Close modal
                  </Button>
                  <Button>Click me</Button>
                </ModalButtons>
              </ModalFooter>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}

const code = `
import { DialogTrigger } from "react-aria-components";
import { Modal, ModalBody, ModalButtons, ModalFooter, ModalHeader, ModalHeading } from "#/ui/modal";
import { Button } from "#/ui/button";
import { Separator } from "#/ui/separator";
import { Dialog } from "#/ui/dialog";

function ModalCloseButton() {
  return (
    <DialogTrigger>
      <Button>Click me</Button>
      <Modal>
        <Dialog>
          {({ close }) => (
            <>
              <ModalHeader>
                <ModalHeading>Lorem ipsum dolor sit amet.</ModalHeading>
              </ModalHeader>

              <Separator />

              <ModalBody>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aperiam architecto blanditiis commodi culpa dicta distinctio
                  dolor dolorem ducimus eveniet id illo illum impedit, iste itaque iusto, libero magnam minima minus nesciunt nostrum numquam omnis
                  optio perspiciatis quae quisquam quod repellat rerum sed suscipit ut, velit veniam vero voluptatibus voluptatum?
                </p>
              </ModalBody>

              <Separator />

              <ModalFooter>
                <ModalButtons>
                  <Button variant="light" onPress={close} color="error">
                    Close modal
                  </Button>
                  <Button>Click me</Button>
                </ModalButtons>
              </ModalFooter>
            </>
          )}
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
}
`;

export const closeButton = { code, preview: <ModalCloseButton /> };
