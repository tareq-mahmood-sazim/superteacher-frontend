import dynamic from "next/dynamic";

import { Loader, Center } from "@mantine/core";

const RegisterTeacherForm = dynamic(() => import("@/shared/components/Forms/TeacherRegisterForm"), {
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
      <RegisterTeacherForm />
    </div>
  );
}
