import dynamic from "next/dynamic";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const LuClipboardList = dynamic(() => import("react-icons/lu").then((mod) => mod.LuClipboardList));

export default function ScheduleExam() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        {/* Modal content */}
      </Modal>

      <Button onClick={open} className="bg-green-500 mx-2">
        <span>
          <LuClipboardList />
        </span>
        &nbsp; Schedule Exam
      </Button>
    </>
  );
}
