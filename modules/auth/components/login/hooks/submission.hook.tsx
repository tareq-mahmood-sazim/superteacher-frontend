import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";

import { loginSchema } from "../helpers/login.validation";

const useStudentRegistration = () => {
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await login(values).unwrap();
      if (response?.accessToken) {
        showNotification({
          title: "Success",
          message: "Logged in Successfully",
          color: "green",
        });
        router.push("/dashboard/home");
      } else {
        showNotification({
          title: "Error",
          message: "Failed to login, wrong password or email?",
          color: "yellow",
        });
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to login",
        color: "red",
      });
      console.error(error);
    }
  };

  return {
    handleSubmit,
    isLoggingIn,
  };
};

export default useStudentRegistration;
