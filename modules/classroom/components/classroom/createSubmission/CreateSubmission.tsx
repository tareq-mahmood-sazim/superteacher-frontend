import { FileInput, Button, Container, Title, Group } from "@mantine/core";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import CreateSubmissionHook from "./hooks/CreateSubmission.hooks";

export default function CreateSubmissionModal({ materialId }: { materialId: number }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close}>
        <CreateSubmissionForm closeButton={close} materialId={materialId} />
      </Modal>

      <Button className="bg-black" onClick={open}>
        Submit
      </Button>
    </>
  );
}

const CreateSubmissionForm = ({
  closeButton,
  materialId,
}: {
  closeButton: () => void;
  materialId: number;
}) => {
  const { form, isSubmitting, onSubmit } = CreateSubmissionHook(materialId, closeButton);

  return (
    <Container size="sm" px="xs" className="p-6 bg-white rounded-lg">
      <Title order={2} align="center" className="text-green-500 mb-6">
        Create Submission
      </Title>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <div className="mb-4">
          <FileInput
            label="Attachments"
            multiple
            accept="image/*, .pdf, .docx, .pptx"
            {...form.getInputProps("attachments")}
            onChange={(files) => {
              if (files) {
                form.setFieldValue(
                  "attachment",
                  Array.from(files).map((file) => file),
                );
              }
            }}
            className="w-full"
            required
          />
        </div>
        <Group position="right" className="mt-6">
          <Button type="reset" color="green" onClick={() => closeButton()} className="w-32">
            Close
          </Button>
          <Button
            type="submit"
            color="green"
            disabled={isSubmitting}
            loading={isSubmitting}
            className="w-32"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </Group>
      </form>
    </Container>
  );
};
