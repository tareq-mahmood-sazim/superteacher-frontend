import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useLoginMutation } from "@/shared/redux/rtk-apis/auth/auth.api";
import { setInLocalStorage } from "@/shared/utils/localStorage";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { loginSchema } from "../helpers/login.validation";

const useLoginSubmission = () => {
  const [login, { isLoading: isLoggingIn }] = useLoginMutation();
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof loginSchema>) => {
    try {
      const response = await login(values).unwrap();
      if (response?.accessToken) {
        showNotification(NotificationMessage("Success", "Logged in successfully"));
        setInLocalStorage("accessToken", response.accessToken);
        setUser(response.user);
        console.log(response);
        router.push("/dashboard/home");
      } else {
        showNotification(NotificationMessage("Warning", "Wrong Email or Password"));
      }
    } catch (error) {
      showNotification(NotificationMessage("Error", "Server Error"));
      console.error(error);
    }
  };

  return {
    handleSubmit,
    isLoggingIn,
  };
};

export default useLoginSubmission;
