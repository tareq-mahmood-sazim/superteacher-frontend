import dynamic from "next/dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextInput, Textarea, FileInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useForm, Controller } from "react-hook-form";

import type { TMaterialFormValues } from "../CreateMaterials.types";
import { ExamSchema } from "./helpers/exam.validation";

const LuFileEdit = dynamic(() => import("react-icons/lu").then((mod) => mod.LuFileEdit));

export default function ScheduleExam() {
  const [opened, { open, close }] = useDisclosure(false);
  const { control, handleSubmit } = useForm<TMaterialFormValues>({
    resolver: zodResolver(ExamSchema),
    defaultValues: {
      title: "",
      instructions: "",
      dueDate: new Date(),
      attachments: [],
    },
  });

  const onSubmit = (data: TMaterialFormValues) =>
    // todo -> implement submission logic here
    data;

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <h2 className="text-xl font-bold mb-4 text-green-500">Schedule Exam</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
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
