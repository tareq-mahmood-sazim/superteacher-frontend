import dynamic from "next/dynamic";

import { Menu } from "@mantine/core";

import DeleteMaterials from "../deleteMaterials";
import EditMaterials from "../editMaterials";

const BSThreeDotsVertical = dynamic(() =>
  import("react-icons/bs").then((mod) => mod.BsThreeDotsVertical),
);

export default function MaterialMenu({ id }: { id: number }) {
  return (
    <Menu shadow="md" width={200} closeOnItemClick={false}>
      <Menu.Target>
        <button>
          <BSThreeDotsVertical />
        </button>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item>
          <EditMaterials id={id} />
        </Menu.Item>
        <Menu.Item>
          <DeleteMaterials id={id} />
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
