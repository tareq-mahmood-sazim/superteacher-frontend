import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { useAppDispatch } from "@/shared/redux/hooks";
import { setUser } from "@/shared/redux/reducers/user.reducer";
import { useCreateStudentMutation } from "@/shared/redux/rtk-apis/students/students.api";
import { setInLocalStorage } from "@/shared/utils/localStorage";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { studentFormSchema } from "../helpers/register.validation";

const useStudentRegistration = () => {
  const [createStudent, { isLoading: isCreatingStudent }] = useCreateStudentMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: z.infer<typeof studentFormSchema>) => {
    try {
      const response = await createStudent(values).unwrap();
      if (response?.statusCode === 201) {
        showNotification(NotificationMessage("Success", response?.data?.message));
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
