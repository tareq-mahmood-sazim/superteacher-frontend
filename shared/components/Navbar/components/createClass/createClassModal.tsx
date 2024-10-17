import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import CreateClassForm from "./components/createClassForm";

export default function CreateClassModal({ buttonName }: { buttonName?: string }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <CreateClassForm />
      </Modal>

      <Button
        variant="none"
        className="text-center text-white border-white border-1 bg-black"
        onClick={open}
      >
        {buttonName ? buttonName : "Create Class"}
      </Button>
    </>
  );
}
