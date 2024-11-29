import { useState } from "react";

import dynamic from "next/dynamic";

import { Button } from "@mantine/core";

import AddAssignment from "./addAssignment";
import AddMaterials from "./addMaterials";
import ScheduleExam from "./scheduleExam";

const IoMdAdd = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdAdd));
const IoMdClose = dynamic(() => import("react-icons/io").then((mod) => mod.IoMdClose));

export default function CreateMaterials() {
  const [areButtonsVisible, setAreButtonsVisible] = useState<boolean>(true);
  return (
    <div className="my-4 flex flex-col md:flex-row">
      <Button
        color="green"
        onClick={() => setAreButtonsVisible(!areButtonsVisible)}
        variant={areButtonsVisible ? "filled" : "outline"}
      >
        <span className="text-lg mr-2"> {areButtonsVisible ? <IoMdAdd /> : <IoMdClose />}</span>
        {areButtonsVisible ? "Create" : "Close"}
      </Button>
      {!areButtonsVisible && <MaterialButtons />}
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
