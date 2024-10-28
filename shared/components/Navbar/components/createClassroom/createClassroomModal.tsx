import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import CreateClassForm from "./components/createClassroomForm";

interface ICreateClassModalProps {
  buttonLabel?: string;
}

export default function CreateClassModal({ buttonLabel }: ICreateClassModalProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <CreateClassForm />
      </Modal>

      <Button
        variant="none"
        classLabel="text-center text-white border-white border-1 bg-black"
        onClick={open}
      >
        {buttonLabel ? buttonLabel : "Create Class"}
      </Button>
    </>
  );
}
