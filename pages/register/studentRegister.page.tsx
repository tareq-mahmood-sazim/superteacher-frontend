import dynamic from "next/dynamic";

import { Loader, Center } from "@mantine/core";

const RegisterStudentForm = dynamic(() => import("@/shared/components/Forms/StudentRegisterForm"), {
  ssr: false,
  loading: () => (
    <Center style={{ height: "100vh" }}>
      <Loader size="xl" color="green" />
    </Center>
  ),
});

export default function register() {
  return (
    <div
      style={{
        backgroundColor: "#141A32",
        padding: "20px",
        borderRadius: "8px",
        height: "100vh",
        width: "100vw",
      }}
    >
      <RegisterStudentForm />
    </div>
  );
}
