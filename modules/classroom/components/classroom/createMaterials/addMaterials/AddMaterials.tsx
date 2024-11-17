import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextInput, Textarea, FileInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { useForm, Controller } from "react-hook-form";

import { useFileProcessingHook } from "@/shared/hooks/useFileProcessingHook";
import { useCreateStudyMaterialsMutation } from "@/shared/redux/rtk-apis/materials/materials.api";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { MaterialSchema } from "./helpers/material.validation";

const LuFileEdit = dynamic(() => import("react-icons/lu").then((mod) => mod.LuFileEdit));

type FormValues = {
  title: string;
  instructions: string;
  dueDate: Date | null;
  attachments?: File[];
  classroomId: number;
};

export default function AddMaterials() {
  const router = useRouter();
  const classroomId = parseInt(router.query["id"] as string);
  const [opened, { open, close }] = useDisclosure(false);
  const [createMaterials] = useCreateStudyMaterialsMutation();
  const { FileProcessing } = useFileProcessingHook();
  const { control, handleSubmit } = useForm<FormValues>({
    resolver: zodResolver(MaterialSchema),
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

      const materialForm = {
        title: data.title,
        instructions: data.instructions,
        dueDate: parseDate,
        attachments: fileKeys.length ? fileKeys : undefined,
        classroom: classroomId,
      };

      const response = await createMaterials(materialForm).unwrap();
      if (response.data) {
        showNotification(NotificationMessage("Success", "Material created successfully"));
        close();
      } else {
        showNotification(NotificationMessage("Error", "Material creation failed"));
      }
    } catch (error) {
      showNotification(NotificationMessage("Error", "Material creation failed"));
      console.error("File upload error:", error);
    }
  };

  return (
    <>
      <Modal opened={opened} onClose={close} centered>
        <h2 className="text-xl font-bold mb-4 text-green-500">Add Material</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
          <Controller
            name="title"
            control={control}
            render={({ field, fieldState }) => (
              <TextInput
                label="Title"
                placeholder="Material Title"
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
                placeholder="Material Instructions"
                minRows={3}
                {...field}
                error={fieldState.error?.message}
              />
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
        &nbsp; Add Material
      </Button>
    </>
  );
}
