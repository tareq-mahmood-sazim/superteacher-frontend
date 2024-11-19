import { useRouter } from "next/router";

import { Accordion, Divider, Loader, Text } from "@mantine/core";

import {
  useGetAssignmentByClassroomQuery,
  useGetStudyMaterialsByClassroomQuery,
  useGetScheduleExamByClassroomQuery,
} from "@/shared/redux/rtk-apis/materials/materials.api";
import type { TMaterial } from "@/shared/redux/rtk-apis/materials/materials.types";

import MaterialItem from "./materialItem";

const AccordionSection = ({
  title,
  items,
  emptyMessage,
}: {
  title: string;
  items: TMaterial[];
  emptyMessage: string;
}) => (
  <Accordion.Item value={title}>
    <Accordion.Control
      className="text-white hover:bg-transparent focus:outline-none"
      style={{ display: "flex", alignItems: "center" }}
    >
      {title}
    </Accordion.Control>
    <Accordion.Panel>
      {items.length === 0 ? <Text>{emptyMessage}</Text> : items.map((item) => MaterialItem(item))}
    </Accordion.Panel>
  </Accordion.Item>
);

export default function GetMaterials() {
  const router = useRouter();
  const classroomId = parseInt((router.query["id"] as string) ?? "0", 10);

  const { data: assignments, isLoading: loadingAssignments } =
    useGetAssignmentByClassroomQuery(classroomId);
  const { data: studyMaterials, isLoading: loadingStudyMaterials } =
    useGetStudyMaterialsByClassroomQuery(classroomId);
  const { data: scheduleExams, isLoading: loadingExams } =
    useGetScheduleExamByClassroomQuery(classroomId);

  const isLoading = loadingAssignments || loadingStudyMaterials || loadingExams;
  const hasError = !assignments || !studyMaterials || !scheduleExams;

  if (isLoading) return <Loader />;
  if (hasError) return <div>Error: Could not load data.</div>;

  const SECTION_PROPS = [
    {
      title: "Scheduled Exams",
      items: scheduleExams,
      emptyMessage: "No scheduled exams available.",
    },
    {
      title: "Assignments",
      items: assignments,
      emptyMessage: "No assignments available.",
    },
    {
      title: "Study Materials",
      items: studyMaterials,
      emptyMessage: "No study materials available.",
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Exams</h1>
      <Divider my="md" color="gray" />
      <Accordion chevronPosition="left" classNames={{ item: "mb-2" }}>
        <AccordionSection
          title="Scheduled Exams"
          items={scheduleExams}
          emptyMessage="No scheduled exams available."
        />
      </Accordion>

      <h1 className="text-2xl font-semibold mb-4 my-8">Uploaded Resources</h1>
      <Divider my="md" color="gray" />
      <Accordion chevronPosition="left" classNames={{ item: "mb-2" }}>
        {SECTION_PROPS.slice(1).map(({ title, items, emptyMessage }) => (
          <AccordionSection key={title} title={title} items={items} emptyMessage={emptyMessage} />
        ))}
      </Accordion>
    </div>
  );
}
