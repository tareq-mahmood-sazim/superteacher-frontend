import dynamic from "next/dynamic";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, TextInput, Textarea, FileInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm, Controller } from "react-hook-form";

import type { MaterialFormValues } from "../CreateMaterials.types";
import { MaterialSchema } from "./helpers/material.validation";

const LuFileEdit = dynamic(() => import("react-icons/lu").then((mod) => mod.LuFileEdit));

export default function AddMaterials() {
  const [opened, { open, close }] = useDisclosure(false);
  const { control, handleSubmit } = useForm<MaterialFormValues>({
    resolver: zodResolver(MaterialSchema),
    defaultValues: {
      title: "",
      instructions: "",
      dueDate: new Date(),
      attachments: [],
    },
  });

  const onSubmit = (data: MaterialFormValues) =>
    // todo -> implement submission logic here
    return data;
  }
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
