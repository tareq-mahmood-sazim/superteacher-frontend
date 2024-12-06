import { useState } from "react";

import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useCreateTeacherMutation } from "@/shared/redux/rtk-apis/teachers/teachers.api";
import type { TApiError } from "@/shared/typedefs";
import { setInLocalStorage } from "@/shared/utils/localStorage";

import { teacherFormSchema } from "../helpers/register.validation";

const useTeacherRegistration = () => {
  const [createTeacher, { isLoading: isCreatingTeacher }] = useCreateTeacherMutation();
  const [attemptsLeft, setAttemptsLeft] = useState<number>(3);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const dispatch = useAppDispatch();
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
      dispatch(
        setUser({
          id: response?.data?.data?.id,
          email: response?.data?.data?.email,
          claimId: response?.data?.data?.userProfile?.role?.id,
          claim: response?.data?.data?.userProfile?.role?.name,
        }),
      );
      setInLocalStorage("accessToken", response?.data?.accessToken);
      router.push("/dashboard/home");
    } catch (error: unknown) {
      const apiError = error as TApiError;
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
