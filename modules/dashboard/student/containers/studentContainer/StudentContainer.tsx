import Link from "next/link";

import { useSelector } from "react-redux";

import ClassroomCard from "@/modules/classroom/components/classroomCard";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { IClassroomResponse } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";
import { useGetStudentQuery } from "@/shared/redux/rtk-apis/students/students.api";
import { TRootState } from "@/shared/redux/store";

export default function StudentContainer() {
  const userId = useSelector((state: TRootState) => state.authenticatedUser.userId);
  const { data, isLoading: studentLoading } = useGetStudentQuery(userId);

  if (studentLoading) return <LoadingComponent visible={false} />;
  if (data) {
    const studentData = data?.data;

    if (studentData.classrooms.length > 0) {
      const classRooms = studentData.classrooms;

      return (
        <>
          {classRooms.map((classroom: IClassroomResponse) => (
            <Link href={`/classroom?id=${classroom.id}`} key={classroom.id}>
              <ClassroomCard
                title={classroom.title}
                subject={classroom.subject}
                daysOfTheWeek={classroom.daysOfTheWeek}
                classTime={classroom.classTime}
              />
            </Link>
          ))}
        </>
      );
    } else {
      return (
        <div className="flex flex-col m-auto p-auto justify-center items-center h-screen">
          <p>You are not enrolled in any classroom, duh?</p>
        </div>
      );
    }
  } else {
    return <LoadingComponent visible={false} />;
  }
}
