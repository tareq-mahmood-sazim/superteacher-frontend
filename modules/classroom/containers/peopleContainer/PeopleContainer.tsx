import { Divider } from "@mantine/core";
import { useSelector } from "react-redux";

import AddStudentToClassroom from "@/modules/classroom/components/people/addStudentToClassroom";

import PeopleDetail from "@/modules/classroom/components/people/peopleDetail";
import TeacherDetail from "@/modules/classroom/components/people/teacherDetail";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import type { IClassroomResponse } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";
import { TRootState } from "@/shared/redux/store";

import TeacherDetail from "../../components/teacherDetail";

export default function PeopleContainer({
  owner,
  participants,
}: {
  owner: number;
  participants: IClassroomResponse["participants"];
}) {
  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);
  if (owner && participants) {
    return (
      <div className="flex flex-col gap-4 mx-8">
        <h2 className="text-2xl font-bold mt-2">Teacher</h2>
        <Divider />
        <TeacherDetail id={owner} />
        <div className="flex flex-row justify-between gap-2">
          <h2 className="text-2xl font-bold">Students</h2>
          {claim === EUserRole.TEACHER ? <AddStudentToClassroom /> : <p>&nbsp;</p>}
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
