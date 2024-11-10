import dynamic from "next/dynamic";

import { Menu } from "@mantine/core";

const CiEdit = dynamic(() => import("react-icons/ci").then((mod) => mod.CiEdit), { ssr: false });
const CiMenuBurger = dynamic(() => import("react-icons/ci").then((mod) => mod.CiMenuBurger), {
  ssr: false,
});
const IoTrashBin = dynamic(() => import("react-icons/io5").then((mod) => mod.IoTrashBin), {
  ssr: false,
});

export default function ClassroomCardMenu() {
  return (
    <Menu width={200} shadow="md">
      <Menu.Target>
        <button className="absolute top-0 right-4 z-[100] text-right text-black text-xl font-bold bg-transparent mt-2">
          <CiMenuBurger />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <button className="flex flex-row items-center gap-2">
            <CiEdit /> Edit Classroom
          </button>
        </Menu.Item>
        <Menu.Item className="hover:bg-red-200 duration-300">
          <button className="flex flex-row items-center gap-2 text-red-500">
            <IoTrashBin /> Delete Classroom
          </button>
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
