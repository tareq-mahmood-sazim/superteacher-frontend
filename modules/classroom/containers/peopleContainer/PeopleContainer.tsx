import { Divider } from "@mantine/core";

import AddStudentOnClassroom from "@/modules/classroom/components/addStudentOnClassroom";
import PeopleDetail from "@/modules/classroom/components/peopleDetail";
import type { IClassroomResponse } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";

import TeacherDetail from "../../components/teacherDetail";

export default function PeopleContainer({
  owner,
  participants,
}: {
  owner: number;
  participants: IClassroomResponse["participants"];
}) {
  if (owner && participants) {
    return (
      <div className="flex flex-col gap-4 mx-8">
        <h2 className="text-2xl font-bold mt-2">Teacher</h2>
        <Divider />
        <TeacherDetail id={owner} />
        <div className="flex flex-row justify-between gap-2">
          <h2 className="text-2xl font-bold">Students</h2>
          <AddStudentOnClassroom />
        </div>
        <Divider />
        {participants.map((participant) => (
          <PeopleDetail key={participant.id} id={participant.id} />
        ))}
      </div>
    );
  } else {
    return <div>Both owner and participants required to render this component</div>;
  }
}
