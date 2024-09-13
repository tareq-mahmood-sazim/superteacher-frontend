import React from "react";
import { useState } from "react";

import dynamic from "next/dynamic";

import { Modal, Card, Group, Text, Container, Title, CloseButton } from "@mantine/core";

const CiUser = dynamic(() => import("react-icons/ci").then((mod) => mod.CiUser), { ssr: false });
const FaChalkboardTeacher = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaChalkboardTeacher),
  { ssr: false },
);

function RoleSelectionModal() {
  const [opened, setOpened] = useState(true);

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      withCloseButton={false}
      centered
      size="sm"
      padding="xl"
    >
      <Container>
        <Group position="apart">
          <Title order={3} style={{ fontSize: "1.5rem", fontWeight: 500 }}>
            Choose your role
          </Title>
          <CloseButton onClick={() => setOpened(false)} />
        </Group>
        <Group position="center" mt="xl" spacing="xl">
          <Card
            shadow="md"
            padding="lg"
            radius="md"
            style={{
              cursor: "pointer",
              border: "1px solid #e0e0e0",
              width: "150px",
              height: "200px",
            }}
          >
            <Group position="center">
              <CiUser size={40} />
              <Text weight={500} size="lg">
                Student
              </Text>
            </Group>
          </Card>

          <Card
            shadow="md"
            padding="lg"
            radius="md"
            style={{
              cursor: "pointer",
              border: "1px solid #e0e0e0",
              width: "150px",
              height: "200px",
            }}
          >
            <Group position="center">
              <FaChalkboardTeacher size={40} />
              <Text weight={500} size="lg">
                Teacher
              </Text>
            </Group>
          </Card>
        </Group>
      </Container>
    </Modal>
  );
}

export default RoleSelectionModal;
