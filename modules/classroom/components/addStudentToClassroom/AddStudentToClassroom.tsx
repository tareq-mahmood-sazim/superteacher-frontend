import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiSquarePlus } from "react-icons/ci";

import AddStudentOnClassroomForm from "@/modules/classroom/components/addStudentToClassroomForm";

export default function AddStudentOnClassroom() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <AddStudentOnClassroomForm />
      </Modal>
      <button onClick={open} className="text-green-500 rounded-md">
        <CiSquarePlus className="text-4xl" />
      </button>
    </>
  );
}
