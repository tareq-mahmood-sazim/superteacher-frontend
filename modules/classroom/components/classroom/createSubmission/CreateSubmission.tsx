import {  Button } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import CreateSubmissionForm from "./components/CreateSubmissionForm";

export default function CreateSubmissionModal({ materialId }: { materialId: number }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <CreateSubmissionForm closeButton={close} materialId={materialId} />
      </Modal>

      <Button className="bg-black" onClick={open}>
        Submit
      </Button>
    </>
  );
}
