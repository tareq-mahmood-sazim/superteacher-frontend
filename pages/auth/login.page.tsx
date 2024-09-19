import dynamic from "next/dynamic";

import { Center, Loader } from "@mantine/core";

const Login = dynamic(() => import("@/shared/components/Forms/LoginForm"), {
  ssr: false,
  loading: () => (
    <Center style={{ height: "100vh" }}>
      <Loader size="xl" color="green" />
    </Center>
  ),
});

export default function LoginPage() {
  return <Login />;
}
