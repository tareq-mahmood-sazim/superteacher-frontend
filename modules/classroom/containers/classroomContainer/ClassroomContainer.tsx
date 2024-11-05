import { Tabs } from "@mantine/core";

import { TAB_ITEMS } from "@/modules/classroom/containers/classroomContainer/ClassroomContainer.contants";

export default function ClassroomContainer() {
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

        <Tabs.Panel value={TAB_ITEMS.STREAM}>stream tab content</Tabs.Panel>
        <Tabs.Panel value={TAB_ITEMS.CLASSWORK}>classwork tab content</Tabs.Panel>
        <Tabs.Panel value={TAB_ITEMS.PEOPLE}>people tab content</Tabs.Panel>
      </Tabs>
    </div>
  );
}
