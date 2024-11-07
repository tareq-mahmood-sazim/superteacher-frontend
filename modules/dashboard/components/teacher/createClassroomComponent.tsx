import React from "react";

import { Button } from "@mantine/core";

import CreateClassModal from "@/shared/components/Navbar/components/createClassroom";

export default function CreateClassroomComponent() {
  return (
    <Button variant="none" className="text-center text-white border-white border-1 bg-black">
      <CreateClassModal buttonLabel="+ Create a Classroom" />
    </Button>
  );
}
