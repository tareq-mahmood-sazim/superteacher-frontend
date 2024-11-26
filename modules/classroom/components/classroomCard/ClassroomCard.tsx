import { Card, Image, Text, Badge, Group } from "@mantine/core";

import ClassroomCardMenu from "../classroomCardMenu";

export default function ClassroomCard({
  title,
  subject,
  daysOfTheWeek,
  classTime,
}: {
  title: string;
  subject: string;
  daysOfTheWeek: string[];
  classTime: string;
}) {
  const formattedTime = new Date(classTime).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDays = daysOfTheWeek.join(", ");
  return (
    <div className="w-[28rem] hover:shadow-xl hover:shadow-slate-500 transition-all duration-300 ease-in-out my-8 mx-auto">
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Card.Section>
          <ClassroomCardMenu />
          <Image src="/classcover.png" height={160} alt="Norway" className="z-[10]" />
        </Card.Section>

        <Group className="justify-between" mt="md" mb="xs">
          <Text fw={500}>{title ?? "classroom"}</Text>
          <Badge variant="outline" color="grape">
            {subject ?? "subject"}
          </Badge>
        </Group>

        <Text size="sm">
          <span className="font-bold">Days:</span> {formattedDays}
        </Text>
        <Text size="sm">
          <span className="font-bold">Class Time:</span> {formattedTime}
        </Text>
      </Card>
    </div>
  );
}
