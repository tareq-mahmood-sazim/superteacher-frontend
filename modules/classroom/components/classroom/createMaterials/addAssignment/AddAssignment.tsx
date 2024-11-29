import dynamic from "next/dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextInput, Textarea, FileInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useDisclosure } from "@mantine/hooks";
import { useForm, Controller } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import { useGetPresignedUrlMutation } from "@/shared/redux/rtk-apis/file-uploads/file-uploads.api";
import { UploadToS3 } from "@/shared/utils/uploadFile";

import type { TFormValues, TPresignedUrlResponse } from "./AddAssignment.types";
import { AssignmentSchema } from "./helpers/assignment.validation";

const LuFileEdit = dynamic(() => import("react-icons/lu").then((mod) => mod.LuFileEdit));

export default function AddAssignment() {
  const [opened, { open, close }] = useDisclosure(false);
  const [uploadFile] = useGetPresignedUrlMutation();
  const { control, handleSubmit } = useForm<TFormValues>({
    resolver: zodResolver(AssignmentSchema),
    defaultValues: {
      title: "",
      instructions: "",
      dueDate: null,
      attachments: [],
    },
  });

  const fileProcess = async (data: TFormValues): Promise<string[]> => {
    const files = data.attachments;
    if (files.length === 0) return [];

    const fileData = files.map((file) => ({
      name: `${uuidv4()}_${file.name}`,
      type: file.type,
    }));

    const response: TPresignedUrlResponse[] = await uploadFile(fileData).unwrap();
    const uploadPromises = files.reduce<Promise<string>[]>((promises, file, index) => {
      const signedUrl = response[index]?.signedUrl;
      if (signedUrl) {
        promises.push(UploadToS3(file, signedUrl));
      }
      return promises;
    }, []);

    return Promise.all(uploadPromises);
  };

  const onSubmit = async (data: TFormValues) => {
    try {
      const fileKeys = await fileProcess(data);
      const assignmentForm = {
        title: data.title,
        instructions: data.instructions,
        dueDate: data.dueDate,
        attachments: fileKeys,
      };
      console.log(assignmentForm);
      // Todo -> add api call here
    } catch (error) {
      // Todo -> throw error notification here
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
                placeholder="Assignment Title"
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
                placeholder="Assignment Instructions"
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
        &nbsp; Add Assignment
      </Button>
    </>
  );
}
