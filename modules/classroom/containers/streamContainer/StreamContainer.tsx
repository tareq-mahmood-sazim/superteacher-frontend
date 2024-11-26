import { useSelector } from "react-redux";

import ClassroomDetail from "@/modules/classroom/components/stream/classroomDetail";
import HeroBackground from "@/modules/classroom/components/stream/heroBackground";
import MeetLinkButton from "@/modules/classroom/components/stream/meetLinkButton";
import MeetLinkCard from "@/modules/classroom/components/stream/meetLinkCard";
import StreamBox from "@/modules/classroom/components/stream/streamBox";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import type { IClassroomResponse } from "@/shared/redux/rtk-apis/classrooms/classrooms.types";
import { TRootState } from "@/shared/redux/store";

export default function StreamContainer({
  classRoomData,
  isLoading,
}: {
  classRoomData: IClassroomResponse;
  isLoading: boolean;
}) {
  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);

  if (isLoading) return <LoadingComponent visible={true} />;

  if (classRoomData) {
    return (
      <div className="min-h-screen text-white flex flex-col items-center py-8">
        <HeroBackground title={classRoomData.title ?? ""} classroomId={classRoomData.id} />

        <div className="w-full max-w-5xl mx-auto mt-6 flex gap-4 flex-col md:flex-row">
          <div className="w-full md:w-1/4 space-y-4">
            {classRoomData.meetLink ? (
              <MeetLinkCard meetLink={classRoomData.meetLink} />
            ) : claim === EUserRole.TEACHER ? (
              <MeetLinkButton classroomId={classRoomData.id} />
            ) : (
              <div>No Meet Links Available For This Classroom</div>
            )}
            <ClassroomDetail classroomDetails={classRoomData} />
          </div>
          <StreamBox />
        </div>
      </div>
    );
  }

  return null;
}
