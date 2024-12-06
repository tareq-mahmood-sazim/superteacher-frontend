import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useSelector } from "react-redux";

import { useFileProcessingHook } from "@/shared/hooks/useFileProcessingHook";
import { useCreateSubmissionMutation } from "@/shared/redux/rtk-apis/submissions/submission.api";
import { TRootState } from "@/shared/redux/store";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { submissionSchema } from "../helpers/submission.validation";
import type { SubmissionFormData } from "../helpers/submission.validation";

export default function CreateSubmissionHook(materialId: number, closeButton: () => void) {
  const [createSubmission, { isLoading: isSubmitting, isError: submissionFailed }] =
    useCreateSubmissionMutation();
  const { FileProcessing } = useFileProcessingHook();
  const userId = useSelector((state: TRootState) => state.authenticatedUser.userId);
  const form = useForm<SubmissionFormData>({
    initialValues: {
      materialId,
      userId: userId ?? 0,
      attachment: [],
    },
    validate: zodResolver(submissionSchema),
  });

  const onSubmit = async (data: SubmissionFormData) => {
    try {
      data.attachment = await FileProcessing(data.attachment);
      const response = await createSubmission(data);
      if (response) {
        showNotification(NotificationMessage("Success", "Submitted"));
        closeButton();
      }
      if (submissionFailed) {
        showNotification(NotificationMessage("Error", "Failed to submit"));
      }
    } catch (err) {
      console.error("Error creating submission:", err);
    }
  };
  return {
    form,
    isSubmitting,
    onSubmit,
  };
}
