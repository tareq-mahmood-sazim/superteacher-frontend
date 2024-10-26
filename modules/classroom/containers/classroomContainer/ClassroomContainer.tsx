import { Tabs } from "@mantine/core";

import PeopleContainer from "@/modules/classroom/containers/peopleContainer";

export default function ClassroomContainer() {
  return (
    <div className="mx-8">
      <Tabs defaultValue="stream">
        <Tabs.List grow className="text-white justify-center">
          <Tabs.Tab value="stream" color="teal" className="hover:bg-transparent">
            <span className="text-white">Stream</span>
          </Tabs.Tab>
          <Tabs.Tab value="classwork" color="teal" className="hover:bg-transparent">
            <span className="text-white">Classroom</span>
          </Tabs.Tab>
          <Tabs.Tab value="people" color="teal" className="hover:bg-transparent">
            <span className="text-white">People</span>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="stream">stream tab content</Tabs.Panel>

        <Tabs.Panel value="classwork">classwork tab content</Tabs.Panel>

        <Tabs.Panel value="people">
          <PeopleContainer />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
