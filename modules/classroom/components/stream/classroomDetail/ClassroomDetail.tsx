import { Card } from "@mantine/core";

import { IClassroomResponse } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";

export default function ClassroomDetail({
  classroomDetails,
}: {
  classroomDetails: Partial<IClassroomResponse>;
}) {
  return (
    <Card
      shadow="sm"
      padding="lg"
      className="bg-white text-black text-center hidden md:flex flex-col"
    >
      <h2 className="text-xl text-center font-extrabold">Details</h2>
      <p className="text-sm my-2">Subject: {classroomDetails.subject}</p>
      <p className="text-sm my-2">Class Time: 6:00:00 PM</p>
      <p className="text-sm my-2">Days: Wednesday, Monday</p>
    </Card>
  );
}
