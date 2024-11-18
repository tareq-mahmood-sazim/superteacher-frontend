import { Card, Group, Text } from "@mantine/core";
import { useSelector } from "react-redux";

import CreateSubmissionModal from "@/modules/classroom/components/classroom/createSubmission";
import GetSubmissions from "@/modules/classroom/components/classroom/getSubmissions";
import { MaterialsEnum } from "@/shared/redux/rtk-apis/materials/materials.types";
import type { TMaterials } from "@/shared/redux/rtk-apis/materials/materials.types";
import { TRootState } from "@/shared/redux/store";

import DownloadAttachments from "../downloadAttachments";
import MaterialMenu from "../materialMenu";

export default function MaterialItem(material: TMaterials) {
  const claim = useSelector((state: TRootState) => state.authenticatedUser.claim);
  return (
    <Card key={material.id} shadow="sm" padding="lg" className="mb-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col">
          <Group position="apart">
            <Text weight={500}>{material.title}</Text>
          </Group>
          <Text size="sm" color="dimmed">
            {material.instructions}
          </Text>
        </div>
        <div>{claim === "STUDENT" ? null : <MaterialMenu id={material.id ?? 0} />}</div>
      </div>
      <div className="flex justify-end mt-2">
        <div className="flex flex-col md:flex-row-reverse">
          {claim === "STUDENT" && material.category !== MaterialsEnum.STUDYMATERIALS ? (
            <CreateSubmissionModal materialId={material.id} />
          ) : (
            claim === "TEACHER" && <GetSubmissions list={material.submissions} />
          )}
          {material.attachments.length > 0 && (
            <DownloadAttachments link={material.attachments[0] ?? "#"} />
          )}
        </div>
      </div>
      <div className="flex justify-end mt-2">
        <Text size="sm" className="m-2">
          Due: {new Date(material.dueDate).toLocaleString()}
        </Text>
      </div>
    </Card>
  );
}
