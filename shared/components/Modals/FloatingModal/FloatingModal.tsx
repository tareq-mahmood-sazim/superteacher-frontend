import React from "react";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function FloatingModal({
  children,
  ButtonIcon,
}: {
  children: React.ReactNode;
  ButtonIcon: React.ReactNode;
}) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        {children}
      </Modal>

      <button onClick={open}>{ButtonIcon}</button>
    </>
  );
}
