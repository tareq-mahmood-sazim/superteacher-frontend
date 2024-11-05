import { useEffect } from "react";

import { useRouter } from "next/router";

import { Tabs } from "@mantine/core";

import PeopleContainer from "@/modules/classroom/containers/peopleContainer";
import StreamContainer from "@/modules/classroom/containers/streamContainer";
import LoadingComponent from "@/shared/components/LoadingComponent";
import { useLazyGetOneClassroomQuery } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

export default function ClassroomContainer() {
  const router = useRouter();
  const { id } = router.query;
  const classroomId = id as string;
  const TAB_ITEMS = {
    STREAM: "stream",
    CLASSWORK: "classwork",
    PEOPLE: "people",
  };

  const [getOneClassroom, { isLoading, isError, data: classroomData }] =
    useLazyGetOneClassroomQuery();

  useEffect(() => {
    if (classroomId) {
      getOneClassroom(classroomId);
    }
  }, [classroomId, getOneClassroom]);

  if (!classroomId) return <LoadingComponent visible />;

  if (isLoading) return <LoadingComponent visible />;

  if (isError)
    return (
      <div className="text-red-500">Failed to load classroom data. Please try again later.</div>
    );

  if (classroomData) {
    return (
      <div className="mx-8">
        <Tabs defaultValue={TAB_ITEMS.STREAM}>
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
          <Tabs.Panel value={TAB_ITEMS.CLASSWORK}>classwork tab content</Tabs.Panel>
          <Tabs.Panel value={TAB_ITEMS.PEOPLE}>
            <PeopleContainer
              owner={classroomData.teacher ?? 0}
              participants={classroomData.participants}
            />
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  } else {
    return (
      <div className="text-red-500">Failed to load classroom data. Please try again later.</div>
    );
  }
}
