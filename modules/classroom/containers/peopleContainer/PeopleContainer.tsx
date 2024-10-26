import { Divider } from "@mantine/core";

import AddStudentOnClassroom from "@/modules/classroom/components/addStudentOnClassroom";
import PeopleDetail from "@/modules/classroom/components/peopleDetail";

export default function PeopleContainer() {
  return (
    <div className="flex flex-col gap-4 mx-8">
      <h2 className="text-2xl font-bold mt-2">Teacher</h2>
      <Divider />
      <PeopleDetail name="john doe (me)" email="john@doe.com" />
      <div className="flex flex-row justify-between gap-2">
        <h2 className="text-2xl font-bold">Students</h2>
        <AddStudentOnClassroom />
      </div>
      <Divider />
      <PeopleDetail name="john doe" email="john@doe.com" />
      <PeopleDetail name="john doe" email="john@doe.com" />
    </div>
  );
}
