import { useState } from "react";

import dynamic from "next/dynamic";

import { Button } from "@mantine/core";

import AddAssignment from "./addAssignment";
import AddMaterials from "./addMaterials";
import ScheduleExam from "./scheduleExam";

const IoMdAdd = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdAdd));
const IoMdClose = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdClose));

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
    <div className="flex flex-col md:flex-row mt-4 md:mt-0 gap-2">
      <ScheduleExam />
      <AddAssignment />
      <AddMaterials />
    </div>
  );
}
