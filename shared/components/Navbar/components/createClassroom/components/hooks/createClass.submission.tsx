import { useRouter } from "next/router";

import { showNotification } from "@mantine/notifications";
import { z } from "zod";

import { useCreateClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { IErrorProps } from "@/shared/typedefs/interfaces";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import CreateClassSchema from "../helpers/createClass.validation";

const CreateClassSubmission = () => {
  const router = useRouter();
  const [createClassroom, { isLoading: isCreatingClassroom }] = useCreateClassroomMutation();

  const handleSubmit = async (values: z.infer<typeof CreateClassSchema>) => {
    try {
      const parsedValue = CreateClassSchema.parse(values);
      await createClassroom(parsedValue).unwrap();
      showNotification(NotificationMessage("Success", "Classroom created successfully"));

      await new Promise((resolve) => setTimeout(resolve, 2000));
      router.reload();
    } catch (error: unknown) {
      const errorData = error as IErrorProps;
      showNotification(
        NotificationMessage("Error", errorData?.data?.message[0] ?? "Error submitting Form"),
      );
    }
  };

  return {
    handleSubmit,
    isCreatingClassroom,
  };
};

export default CreateClassSubmission;
