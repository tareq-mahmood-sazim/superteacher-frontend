import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { useCreateStudentMutation } from "@/shared/redux/rtk-apis/students/students.api";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { studentFormSchema } from "../helpers/register.validation";

const useStudentRegistration = () => {
  const [createStudent, { isLoading: isCreatingStudent }] = useCreateStudentMutation();
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof studentFormSchema>) => {
    try {
      const response = await createStudent(values).unwrap();
      if (response?.statusCode === 201) {
        showNotification(NotificationMessage("Success", response?.data?.message));
        router.push("/auth/login");
      } else {
        showNotification(NotificationMessage("Warning", response?.data?.message));
      }
    } catch (error) {
      showNotification(NotificationMessage("Error", "An error occurred while registering student"));
      console.error("Error registering student:", error);
    }
  };

  return {
    handleSubmit,
    isCreatingStudent,
  };
};

export default useStudentRegistration;
