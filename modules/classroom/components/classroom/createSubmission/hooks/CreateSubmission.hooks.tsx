import { useForm, zodResolver } from "@mantine/form";
import { useSelector } from "react-redux";

import { TRootState } from "@/shared/redux/store";

import { submissionSchema } from "../helpers/submission.validation";
import type { SubmissionFormData } from "../helpers/submission.validation";

export default function CreateSubmissionHook(materialId: number, closeButton: () => void) {
  const userId = useSelector((state: TRootState) => state.authenticatedUser.userId);
  const form = useForm<SubmissionFormData>({
    initialValues: {
      materialId,
      userId: userId ?? 0,
      attachment: [],
    },
    validate: zodResolver(submissionSchema),
  });

  const onSubmit = (data: SubmissionFormData) => {
    try {
      // Todo -> submit the data
      closeButton();
      return data;
    } catch (err) {
      // Todo -> handle the error with a notification
      return data;
    }
  };
  return {
    form,
    onSubmit,
    isSubmitting: true,
  };
}
