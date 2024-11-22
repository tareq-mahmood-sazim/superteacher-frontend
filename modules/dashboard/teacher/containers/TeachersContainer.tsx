import Link from "next/link";
import { Loader, SimpleGrid, Text } from "@mantine/core";

import { useGetClassroomsByTeacherQuery } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import ClassroomCard from "../components/ClassroomCard";
import CreateClassroomComponent from "../components/CreateClassroom/createClassroomComponent";

export default function TeacherContainer() {
  const { data: classRoomData, isLoading } = useGetClassroomsByTeacherQuery();
  if (isLoading) {
    return (
      <div className="flex flex-col m-auto p-auto justify-center items-center h-screen">
        <Loader />
      </div>
    );
  }
  if (classRoomData) {
    if (classRoomData.length > 0) {
      return (
        <div>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: 980, cols: 2, spacing: "md" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            {classRoomData.map((classroom, index: number) => (
              <Link href={`/classroom?id=${classroom.id ?? ""}`} key={index}>
                <ClassroomCard
                  key={classroom.id}
                  title={classroom?.title ?? ""}
                  subject={classroom?.subject ?? ""}
                  classTime={classroom?.classTime ?? ""}
                  daysOfTheWeek={classroom?.daysOfTheWeek ?? ""}
                />
              </Link>
            ))}
          </SimpleGrid>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col m-auto p-auto justify-center items-center h-screen">
          <CreateClassroomComponent />
        </div>
      );
    }
  } else {
    return (
      <div className="flex flex-col m-auto p-auto justify-center items-center h-screen">
        <Text> Failed to fetch classrooms </Text>
      </div>
    );
  }
}
