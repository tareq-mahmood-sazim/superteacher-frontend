import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextInput, Textarea, FileInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useForm, Controller } from "react-hook-form";

import { useFileProcessingHook } from "@/shared/hooks/useFileProcessingHook";
import { useCreateScheduleExamMutation } from "@/shared/redux/rtk-apis/materials/materials.api";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { ExamSchema } from "./helpers/exam.validation";

const LuFileEdit = dynamic(() => import("react-icons/lu").then((mod) => mod.LuFileEdit));

type FormValues = {
  title: string;
  instructions: string;
  dueDate: Date | null;
  attachments?: File[];
  classroomId: number;
};

export default function ScheduleExam() {
  const router = useRouter();
  const classroomId = parseInt(router.query["id"] as string);
  const [opened, { open, close }] = useDisclosure(false);
  const [createExams] = useCreateScheduleExamMutation();
  const { FileProcessing } = useFileProcessingHook();
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(ExamSchema),
    defaultValues: {
      title: "",
      instructions: "",
      dueDate: new Date(),
      attachments: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const fileKeys = data.attachments?.length ? await FileProcessing(data.attachments) : [];
      const parseDate = new Date(data.dueDate ?? "");

      const examForm = {
        title: data.title,
        instructions: data.instructions,
        dueDate: parseDate,
        attachments: fileKeys.length ? fileKeys : undefined,
        classroomId,
      };

      const response = await createExams(examForm).unwrap();
      if (response.data) {
        showNotification(NotificationMessage("Success", "Exam created successfully"));
        close();
      } else {
        showNotification(NotificationMessage("Error", "Exam creation failed"));
      }
    } catch (error) {
      showNotification(NotificationMessage("Error", "Exam creation failed"));
      console.error("File upload error:", error);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Title"
                placeholder="Exam Title"
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="instructions"
            control={control}
            render={({ field, fieldState }) => (
              <Textarea
                label="Instructions"
                placeholder="Exam Instructions"
                minRows={3}
                {...field}
                error={fieldState.error?.message}
              />
            )}
          />

          <Controller
            name="dueDate"
            control={control}
            render={({ field }) => (
              <DateInput label="Due Date" placeholder="Select due date" {...field} />
            )}
          />

          <Controller
            name="attachments"
            control={control}
            render={({ field }) => (
              <FileInput
                label="Attachments"
                multiple
                {...field}
                onChange={(files) => field.onChange(files as File[])}
              />
            )}
          />

          <Button type="submit" fullWidth mt="md" color="green">
            Submit
          </Button>
        </form>
      </Modal>

      <Button onClick={open} className="bg-green-500 mx-2">
        <span>
          <LuFileEdit />
        </span>
        &nbsp; Add Exam
      </Button>
    </>
  );
}
