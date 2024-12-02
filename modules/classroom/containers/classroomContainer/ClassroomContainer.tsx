import { useEffect } from "react";

import { useRouter } from "next/router";

import { Tabs } from "@mantine/core";
import { useSelector } from "react-redux";

import MaterialContainer from "@/modules/classroom/containers/materialsContainer";
import PeopleContainer from "@/modules/classroom/containers/peopleContainer";
import StreamContainer from "@/modules/classroom/containers/streamContainer";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";
import {
  useLazyGetOneClassroomQuery,
  useLazyIsParticipantQuery,
} from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { TRootState } from "@/shared/redux/store";

export default function ClassroomContainer() {
  const router = useRouter();
  const { id, tab = "stream" } = router.query;
  const classroomId = id as string;

  const TAB_ITEMS = {
    STREAM: "stream",
    CLASSWORK: "classwork",
    PEOPLE: "people",
  };

  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);

  const [getOneClassroom, { isLoading, isError, data: classroomData }] =
    useLazyGetOneClassroomQuery();
  const [
    isParticipantCheck,
    { data: isParticipant, isLoading: checkingParticipant, isError: isParticipantError },
  ] = useLazyIsParticipantQuery();

  useEffect(() => {
    if (classroomId) {
      isParticipantCheck(classroomId);
      getOneClassroom(classroomId);
    }
  }, [classroomId, getOneClassroom, isParticipantCheck]);

  const handleTabChange = (value: string) => {
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, tab: value },
      },
      undefined,
      { shallow: true },
    );
  };

  if (!classroomId || isLoading || checkingParticipant) return <LoadingComponent visible />;

  if ((classroomData && claim === EUserRole.TEACHER) || (classroomData && isParticipant)) {
    return (
      <div className="mx-8">
        <Tabs value={tab as string} onTabChange={handleTabChange}>
          <Tabs.List grow className="text-white justify-center">
            <Tabs.Tab value={TAB_ITEMS.STREAM} color="teal" className="hover:bg-transparent">
              <span className="text-white">Stream</span>
            </Tabs.Tab>
            <Tabs.Tab value={TAB_ITEMS.CLASSWORK} color="teal" className="hover:bg-transparent">
              <span className="text-white">Classroom</span>
            </Tabs.Tab>
            <Tabs.Tab value={TAB_ITEMS.PEOPLE} color="teal" className="hover:bg-transparent">
              <span className="text-white">People</span>
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value={TAB_ITEMS.STREAM}>
            <StreamContainer classRoomData={classroomData} isLoading={isLoading} />
          </Tabs.Panel>
          <Tabs.Panel value={TAB_ITEMS.CLASSWORK}>
            <MaterialContainer />
          </Tabs.Panel>
          <Tabs.Panel value={TAB_ITEMS.PEOPLE}>
            <PeopleContainer
              owner={classroomData.teacher ?? 0}
              participants={classroomData.participants}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  }
  if (isError || isParticipantError) {
    return <div className="text-red-500">This classroom may not exist yet</div>;
  } else {
    return <div className="text-red-500">You are not authorized to access this classroom.</div>;
  }
}
