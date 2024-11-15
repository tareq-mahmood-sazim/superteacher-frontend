import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Accordion, Text, Card, Group } from "@mantine/core";

import {
  useGetAssignmentByClassroomQuery,
  useGetStudyMaterialsByClassroomQuery,
  useGetScheduleExamByClassroomQuery,
} from "@/shared/redux/rtk-apis/materials/materials.api";
import type { TMaterials } from "@/shared/redux/rtk-apis/materials/materials.types";

import CreateSubmissionModal from "../createSubmission";

const FaChevronDown = dynamic(() => import("react-icons/fa6").then((mod) => mod.FaChevronDown), {
  ssr: false,
});

export default function GetMaterials() {
  const router = useRouter();
  const classroomId = parseInt((router.query["id"] as string) ?? "0", 10);

  const { data: assignments, isLoading: loadingAssignments } =
    useGetAssignmentByClassroomQuery(classroomId);
  const { data: studyMaterials, isLoading: loadingStudyMaterials } =
    useGetStudyMaterialsByClassroomQuery(classroomId);
  const { data: scheduleExams, isLoading: loadingExams } =
    useGetScheduleExamByClassroomQuery(classroomId);

  if (loadingAssignments || loadingStudyMaterials || loadingExams) {
    return <div>Loading...</div>;
  }

  if (!assignments || !studyMaterials || !scheduleExams) {
    return <div>Error: Could not load data.</div>;
  }

  const renderMaterialItem = (material: TMaterials) => (
    <Card key={material.id} shadow="sm" padding="lg" className="mb-4">
      <Group position="apart">
        <Text weight={500}>{material.title}</Text>
      </Group>
      <Text size="sm" color="dimmed">
        {material.instructions}
      </Text>
      <div className="flex justify-end mt-2">
        <div className="flex flex-col md:flex-row-reverse">
          <CreateSubmissionModal materialId={material.id} />
          <Text size="sm" className="m-2">
            Due: {new Date(material.dueDate).toLocaleString()}
          </Text>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">Uploaded Resources</h1>
      <Accordion classNames={{ item: "mb-2" }}>
        <Accordion.Item value="assignments">
          <Accordion.Control
            className="text-white hover:bg-transparent focus:outline-none"
            style={{ display: "flex", alignItems: "center" }}
          >
            <div className="flex flex-row gap-6">
              <FaChevronDown size={18} className="mr-2" />
              <p>Assignments</p>
            </div>
          </Accordion.Control>
          <Accordion.Panel>
            {assignments.length === 0 ? (
              <Text>No assignments available.</Text>
            ) : (
              assignments.map((assignment) => renderMaterialItem(assignment))
            )}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="studyMaterials">
          <Accordion.Control
            className="text-white hover:bg-transparent focus:outline-none"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaChevronDown size={18} className="mr-2" />
            Study Materials
          </Accordion.Control>
          <Accordion.Panel>
            {studyMaterials.length === 0 ? (
              <Text>No study materials available.</Text>
            ) : (
              studyMaterials.map((material) => renderMaterialItem(material))
            )}
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="exams">
          <Accordion.Control
            className="text-white hover:bg-transparent focus:outline-none"
            style={{ display: "flex", alignItems: "center" }}
          >
            <FaChevronDown size={18} className="mr-2" />
            Scheduled Exams
          </Accordion.Control>
          <Accordion.Panel>
            {scheduleExams.length === 0 ? (
              <Text>No scheduled exams available.</Text>
            ) : (
              scheduleExams.map((exam) => renderMaterialItem(exam))
            )}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </div>
  );
}
