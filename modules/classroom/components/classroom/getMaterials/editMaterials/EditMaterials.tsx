import { useEffect } from "react";

import { Modal, Button, TextInput, Textarea, MultiSelect } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";

import {
  useGetOneMaterialByIdQuery,
  useUpdateMaterialByIdMutation,
} from "@/shared/redux/rtk-apis/materials/materials.api";
import { TMaterialRequest } from "@/shared/redux/rtk-apis/materials/materials.types";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import { materialSchema } from "./helpers/EditMaterial.validation";

export default function EditMaterials({ id }: { id: number }) {
  const [opened, { open, close }] = useDisclosure(false);
  const {
    data: materialData,
    isLoading: materialIsLoading,
    isError: materialLoadError,
  } = useGetOneMaterialByIdQuery(id);
  const [editMaterial, { isLoading: editMaterialIsLoading }] = useUpdateMaterialByIdMutation();

  const form = useForm<TMaterialRequest>({
    initialValues: {
      title: "",
      instructions: "",
      dueDate: null,
      attachments: [],
      classroom: 0,
    },
    validate: zodResolver(materialSchema),
  });

  useEffect(() => {
    if (materialData) {
      const { title, instructions, dueDate, attachments, classroom } = materialData;
      form.setValues({
        title,
        instructions,
        dueDate: dueDate ? new Date(dueDate) : null,
        attachments: attachments || [],
        classroom: typeof classroom === "number" ? classroom : classroom.id,
      });
    }
  }, [materialData, form]);

  const handleSubmit = async (values: TMaterialRequest) => {
    try {
      await editMaterial({
        id,
        ...values,
        dueDate: values.dueDate ? new Date(values.dueDate.toISOString()) : null,
      }).unwrap();
      showNotification(NotificationMessage("Success", "Material updated successfully"));
      close();
    } catch (error) {
      showNotification(NotificationMessage("Error", "Failed to update material"));
      console.error("Error updating material", error);
    }
  };

  if (materialIsLoading) return <div>Loading...</div>;
  if (materialLoadError) return <div>Error loading material</div>;

  return (
    <>
      <Modal opened={opened} onClose={close} title="Edit Material" centered>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label="Title"
            placeholder="Enter material title"
            {...form.getInputProps("title")}
          />
          <Textarea
            label="Instructions"
            placeholder="Enter instructions"
            minRows={4}
            {...form.getInputProps("instructions")}
          />
          <DatePicker {...form.getInputProps("dueDate")} />
          <MultiSelect
            label="Attachments"
            placeholder="Enter attachment URLs"
            data={form.values.attachments || []}
            creatable
            searchable
            getCreateLabel={(query) => `+ Add "${query}"`}
            onCreate={(query) => {
              const newAttachments = [...(form.values.attachments || []), query];
              form.setFieldValue("attachments", newAttachments);
              return query;
            }}
            {...form.getInputProps("attachments")}
          />

          <Button type="submit" fullWidth mt="md" loading={editMaterialIsLoading}>
            Update Material
          </Button>
        </form>
      </Modal>

      <button className="w-full text-left" onClick={open}>
        Edit Material
      </button>
    </>
  );
}
