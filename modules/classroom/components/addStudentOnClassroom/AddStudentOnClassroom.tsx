import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { CiSquarePlus } from "react-icons/ci";

import AddStudentOnClassroomForm from "@/modules/classroom/components/addStudentOnClassroomForm";

export default function AddStudentOnClassroom() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <div className="mx-4 px-4">
          <h2 className="text-2xl font-bold mb-4 text-green-500">ENROLL A STUDENT</h2>
          <AddStudentOnClassroomForm onClose={close} />
        </div>
      </Modal>
      <button onClick={open} className="text-green-500 rounded-md">
        <CiSquarePlus className="text-4xl" />
      </button>
    </>
  );
}
