// todo -> dependent over teacher dashboard
import { TextInput, Button, MultiSelect, Container, Title } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";

import CreateClassSchema from "./helpers/createClass.validation";

export default function CreateClassForm() {
  const form = useForm({
    initialValues: {
      title: "",
      subject: "",
      classTime: "",
      daysOfTheWeek: [],
    },
    validate: zodResolver(CreateClassSchema),
  });
  const handleSubmit = (values: z.infer<typeof CreateClassSchema>) => values;

  return (
    <Container size="sm" px="xs" my="lg">
      <Title order={2} align="left" style={{ color: "#5CAA70", marginBottom: "20px" }}>
        CREATE A CLASSROOM
      </Title>
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Title"
          placeholder="Enter class title"
          {...form.getInputProps("title")}
          classNames={{ label: "text-green-500" }}
          required
        />
        <TextInput
          mt="md"
          label="Subject"
          placeholder="Enter subject"
          {...form.getInputProps("subject")}
          classNames={{ label: "text-green-500" }}
          required
        />
        <TimeInput
          mt="md"
          label="Class Time"
          placeholder="Select class time"
          {...form.getInputProps("classTime")}
          classNames={{ label: "text-green-500" }}
          required
        />
        <MultiSelect
          mt="md"
          label="Days of the Week"
          placeholder="Select days"
          classNames={{ label: "text-green-500" }}
          data={[
            { value: "monday", label: "Monday" },
            { value: "tuesday", label: "Tuesday" },
            { value: "wednesday", label: "Wednesday" },
            { value: "thursday", label: "Thursday" },
            { value: "friday", label: "Friday" },
            { value: "saturday", label: "Saturday" },
            { value: "sunday", label: "Sunday" },
          ]}
          {...form.getInputProps("daysOfTheWeek")}
          required
        />
        <div className="flex justify-center mt-4">
          <Button type="submit" color="green">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
}
