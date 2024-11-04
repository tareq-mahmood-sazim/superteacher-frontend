import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiSquarePlus } from "react-icons/ci";

import AddStudentToClassroomForm from "@/modules/classroom/components/addStudentToClassroomForm";

export default function AddStudentToClassroom() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <AddStudentToClassroomForm />
      </Modal>
      <button onClick={open} className="text-green-500 rounded-md">
        <CiSquarePlus className="text-4xl" />
      </button>
    </>
  );
}
