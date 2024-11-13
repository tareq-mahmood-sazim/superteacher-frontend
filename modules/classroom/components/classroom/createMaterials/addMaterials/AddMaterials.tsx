import dynamic from "next/dynamic";

import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const LuMonitor = dynamic(() => import("react-icons/lu").then((mod) => mod.LuMonitor));

export default function AddMaterials() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        {/* Modal content */}
      </Modal>

      <Button onClick={open} className="bg-green-500 mx-2">
        <span>
          <LuMonitor />
        </span>
        &nbsp; Add Material
      </Button>
    </>
  );
}
