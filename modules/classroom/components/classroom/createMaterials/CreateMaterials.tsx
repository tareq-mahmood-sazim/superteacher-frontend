import { useState } from "react";

import dynamic from "next/dynamic";

import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const IoMdAdd = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdAdd));
const IoMdClose = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdClose));
const LuClipboardList = dynamic(() => import("react-icons/lu").then((mod) => mod.LuClipboardList));
const LuFileEdit = dynamic(() => import("react-icons/lu").then((mod) => mod.LuFileEdit));
const LuMonitor = dynamic(() => import("react-icons/lu").then((mod) => mod.LuMonitor));

export default function CreateMaterials() {
  const [appear, setAppear] = useState<boolean>(true);
  return (
    <div className="my-4 flex flex-col md:flex-row">
      <Button
        color="green"
        onClick={() => setAppear(!appear)}
        variant={appear ? "filled" : "outline"}
      >
        <span className="text-lg mr-2"> {appear ? <IoMdAdd /> : <IoMdClose />}</span>
        {appear ? "Create" : "Close"}
      </Button>
      {!appear && <MaterialButtons />}
    </div>
  );
}

function MaterialButtons() {
  return (
    <div className="flex flex-row">
      <ScheduleExam />
      <AddAssignment />
      <AddMaterials />
    </div>
  );
}

function ScheduleExam() {
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
function AddAssignment() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        {/* Modal content */}
      </Modal>

      <Button onClick={open} className="bg-green-500 mx-2">
        <span>
          <LuFileEdit />
        </span>
        &nbsp; Add Assignment
      </Button>
    </>
  );
}
function AddMaterials() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        {/* Modal content */}
      </Modal>

      <Button onClick={open} className="bg-green-500 mx-2">
        <span>
          <LuMonitor />
        </span>
        &nbsp; Add Material
      </Button>
    </>
  );
}
