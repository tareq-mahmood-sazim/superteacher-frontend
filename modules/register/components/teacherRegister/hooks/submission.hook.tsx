import { useState } from "react";

import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { useCreateTeacherMutation } from "@/shared/redux/rtk-apis/teachers/teachers.api";
import type { ApiError } from "@/shared/typedefs";

import { teacherFormSchema } from "../helpers/register.validation";

const useTeacherRegistration = () => {
  const [createTeacher, { isLoading: isCreatingTeacher }] = useCreateTeacherMutation();
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (values: z.infer<typeof teacherFormSchema>) => {
    if (attemptsLeft > 3) {
      showNotification({
        title: "Error",
        message: "You have exceeded the maximum number of attempts!",
        color: "red",
      });
      setIsDisabled(true);
      return;
    }
    try {
      const response = await createTeacher(values).unwrap();
      showNotification({
        title: "Success",
        message: response?.data?.message,
        color: "green",
      });
      router.push("/auth/login");
    } catch (error: unknown) {
      const apiError = error as ApiError;
      if (apiError?.data?.message === "Wrong Unique Code") {
        setAttemptsLeft((prevAttempts) => {
          const newAttempts = prevAttempts - 1;
          if (newAttempts <= 0) setIsDisabled(true);
          return newAttempts;
        });
        showNotification({
          title: "Error",
          message: "Wrong Unique Code!",
          color: "red",
        });
      } else {
        showNotification({
          title: "Error",
          message: "Something went wrong!",
          color: "red",
        });
      }
      console.error("Error registering teacher:", error);
    }
  };

  return {
    handleSubmit,
    isCreatingTeacher,
    attemptsLeft,
    isDisabled,
    setAttemptsLeft,
    setIsDisabled,
  };
};

export default useTeacherRegistration;
