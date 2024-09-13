import dynamic from "next/dynamic";

import { Container, Title, Text, Group } from "@mantine/core";
import { Card } from "@mantine/core";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const CiUser = dynamic(() => import("react-icons/ci").then((mod) => mod.CiUser), { ssr: false });
const FaChalkboardTeacher = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaChalkboardTeacher),
  { ssr: false },
);

export default function RegistrationModal() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        overlayProps={{
          blur: 3,
        }}
      >
        <Container>
          <Group position="apart">
            <Title order={3} style={{ fontSize: "1.5rem", fontWeight: 500 }}>
              Choose your role
            </Title>
          </Group>
          <Group position="center" mt="xl" spacing="xl">
            <Card
              shadow="md"
              padding="lg"
              radius="md"
              component="a"
              href="register/studentRegister"
              style={{
                cursor: "pointer",
                border: "1px solid #e0e0e0",
                width: "150px",
                height: "200px",
              }}
            >
              <Group position="center" style={{ marginTop: "30px" }}>
                <CiUser size={40} color="black" />
                <Text weight={500} size="lg" style={{ color: "black", textDecoration: "none" }}>
                  Student
                </Text>
              </Group>
            </Card>

            <Card
              shadow="md"
              padding="lg"
              radius="md"
              component="a"
              href="register/teacherRegister"
              style={{
                cursor: "pointer",
                border: "1px solid #e0e0e0",
                width: "150px",
                height: "200px",
              }}
            >
              <Group
                position="center"
                style={{ marginTop: "30px", display: "flex", flexDirection: "row" }}
              >
                <FaChalkboardTeacher size={40} color="black" />
                <Text weight={500} size="lg" style={{ color: "black", textDecoration: "none" }}>
                  Teacher
                </Text>
              </Group>
            </Card>
          </Group>
        </Container>
      </Modal>

      <Button onClick={open} variant="outline" color="green" size="md">
        Sign up
      </Button>
    </>
  );
}
