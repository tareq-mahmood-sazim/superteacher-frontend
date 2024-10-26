import dynamic from "next/dynamic";

import FloatingModal from "@/shared/components/Modals/FloatingModal";

const FaRegTrashCan = dynamic(() => import("react-icons/fa6").then((mod) => mod.FaRegTrashCan), {
  ssr: false,
});

function DeleteStudentPrompt() {
  return <div>Do you really want to remove the student?</div>;
}

export default function PeopleDetail({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex flex-row justify-between gap-2">
      <p>{name}</p>
      <div className="flex flex-row justify-between gap-2">
        <p>{email}</p>
        <FloatingModal ButtonIcon={<FaRegTrashCan className="text-purple-700" />}>
          <DeleteStudentPrompt />
        </FloatingModal>
      </div>
    </div>
  );
}
