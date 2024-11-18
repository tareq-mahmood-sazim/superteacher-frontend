import { Container, Title, Group } from "@mantine/core";
import { Card } from "@mantine/core";
import { Modal, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { FaGraduationCap } from "react-icons/fa";
import { IoLibrarySharp } from "react-icons/io5";

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
              <div className="my-16 w-full text-center flex flex-row items-center gap-2 ml-2">
                <IoLibrarySharp color="black" />
                Student
              </div>
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
              <div className="my-16 w-full text-center flex flex-row items-center gap-2 ml-2">
                <FaGraduationCap color="black" />
                Teacher
              </div>
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
