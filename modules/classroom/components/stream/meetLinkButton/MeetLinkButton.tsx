import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, Button, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { useAddMeetLinkMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";
import { NotificationMessage } from "@/shared/utils/notificationMessage";

const meetLinkPattern = /^(https?:\/\/)?(meet\.google\.com)\/[a-z]{3,4}-[a-z]{3,4}-[a-z]{3,4}$/;

const schema = z.object({
  meetLink: z.string().regex(meetLinkPattern, "Invalid Google Meet link"),
});

type FormData = z.infer<typeof schema>;

export default function MeetLinkButton({ classroomId }: { classroomId: number }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [
    addMeetLink,
    { data: addedMeetLink, isLoading: addingMeetLink, isError: addMeetLinkError },
  ] = useAddMeetLinkMutation();

  const onSubmit: SubmitHandler<FormData> = async (data: z.infer<typeof schema>) => {
    await addMeetLink({ ...data, classroomId });
    if (addingMeetLink) {
      showNotification(NotificationMessage("loading", "Adding meet link..."));
    }
    if (addMeetLinkError) {
      showNotification(NotificationMessage("error", "Failed to add meet link"));
    }
    if (addedMeetLink) {
      showNotification(NotificationMessage("success", "Meet link added successfully"));
    }
  };

  return (
    <Popover width={300} trapFocus position="bottom" withArrow shadow="md">
      <Popover.Target>
        <Button
          variant="outline"
          color="green"
          className="w-full hover:bg-green-500 hover:text-white duration-300"
        >
          + Add meet link
        </Button>
      </Popover.Target>
      <Popover.Dropdown>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            label="Class Link"
            placeholder="meet.google.com/xxx-xxx"
            size="xs"
            {...register("meetLink")}
            error={errors.meetLink?.message}
          />
          <Button
            type="submit"
            variant="outline"
            color="green"
            className="w-full hover:bg-green-500 hover:text-white duration-300"
            disabled={!!errors.meetLink}
          >
            Add
          </Button>
        </form>
      </Popover.Dropdown>
    </Popover>
  );
}
