import { FileInput, Button, Container, Title, Group } from "@mantine/core";

import CreateSubmissionHook from "@/modules/classroom/components/classroom/createSubmission/hooks/CreateSubmission.hooks";

interface ICreateSubmissionFormProps {
  closeButton: () => void;
  materialId: number;
}

export default function CreateSubmissionForm({
  closeButton,
  materialId,
}: ICreateSubmissionFormProps) {
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
}
