import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { useCreateStudentMutation } from "@/shared/redux/rtk-apis/students/students.api";

import { studentFormSchema } from "../helpers/register.validation";

const useStudentRegistration = () => {
  const [createStudent, { isLoading: isCreatingStudent }] = useCreateStudentMutation();
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof studentFormSchema>) => {
    try {
      const response = await createStudent(values).unwrap();
      if (response?.statusCode === 201) {
        showNotification({
          title: "Success",
          message: response?.data?.message,
          color: "green",
        });
        router.push("/auth/login");
      } else {
        showNotification({
          title: "Error",
          message: response?.data?.message,
          color: "yellow",
        });
      }
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to register the student.",
        color: "red",
      });
      console.error("Error registering student:", error);
    }
  };

  return {
    handleSubmit,
    isCreatingStudent,
  };
};

export default useStudentRegistration;
