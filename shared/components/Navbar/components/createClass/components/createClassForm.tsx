import { useEffect, useState } from "react";

import { TextInput, Button, MultiSelect, Container, Title, Select, Loader } from "@mantine/core";
import { TimeInput } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import { useSelector } from "react-redux";
import { z } from "zod";

import { useLazyProfileQuery } from "@/shared/redux/rtk-apis/profiles/profiles.api";
import { IUserData } from "@/shared/redux/rtk-apis/profiles/profiles.types";
import { TRootState } from "@/shared/redux/store";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

import CreateClassSchema from "./helpers/createClass.validation";

export default function CreateClassForm() {
  const [getProfile, { isLoading: loadingProfile }] = useLazyProfileQuery();
  const userID = useSelector((state: TRootState) => state.authenticatedUser?.userId);
  const [profile, setProfile] = useState<IUserData | null>(null);

  useEffect(() => {
    if (userID) {
      getProfile(userID.toString())
        .then(({ data }) => {
          if (data) setProfile(data);
        })
        .catch((error) => {
          console.error(error);
          showNotification(NotificationMessage("Warning", "Failed to get profile"));
        });
    }
  }, [userID, getProfile]);

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

  if (loadingProfile) return <Loader color="green" />;

  return profile ? (
    <Container size="sm" px="xs" my="lg">
      <Title order={2} align="left" style={{ color: "#5CAA70", marginBottom: "20px" }}>
        CREATE A CLASSROOM
      </Title>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter class title"
          {...form.getInputProps("title")}
          classNames={{ label: "text-green-500" }}
          required
        />
        <Select
          mt="md"
          label="Subject"
          placeholder="Enter subject"
          data={profile.userProfile.subjectsToTeach}
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
  ) : (
    <div className="flex flex-col text-center justify-center mx-auto px-auto">
      <p>Loading User Profile</p>
      <Loader color="green" className="my-4" />
    </div>
  );
}
