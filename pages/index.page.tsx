import { Container, Title, Text, Group } from "@mantine/core";
import { Button } from "@mantine/core";

import RegistrationModal from "@/shared/components/Modals/RegistrationModal";
import NextHead from "@/shared/components/NextHead";


export default function Home() {
  return (
    <>
      <NextHead />
      <div
        style={{
          backgroundColor: "#141932",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Container style={{ textAlign: "center" }}>
          <Title order={1} style={{ color: "white", fontSize: "2rem", marginBottom: "0.5rem" }}>
            WELCOME TO SUPERTEACHER
          </Title>
          <Text style={{ color: "#bdbdbd", marginBottom: "2rem" }}>
            Where learning and teaching come together!
          </Text>
          <Group position="center" spacing="xl">
            <RegistrationModal />
            <Button
              variant="outline"
              color="green"
              size="md"
              component="a"
              href="auth/login"
              target="_blank"
            >
              Login
            </Button>
          </Group>
        </Container>
      </div>
    </>
  );
}
