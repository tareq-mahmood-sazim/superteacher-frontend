import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import CreateClassForm from "./components/createClassForm";

export default function CreateClassModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <CreateClassForm />
      </Modal>

      <Button variant="none" className="text-white border-white text-lg w-12" onClick={open}>
        + Create a classroom
      </Button>
    </>
  );
}
