import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useRemoveParticipantFromClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import { useProfileQuery } from "@/shared/redux/rtk-apis/profiles/profiles.api";

import SelfUserDetail from "../selfUserDetail";

const FaRegTrashCan = dynamic(() => import("react-icons/fa6").then((mod) => mod.FaRegTrashCan), {
  ssr: false,
});

function DeleteStudentPrompt({ id: userId, username }: { id: number; username?: string }) {
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [removeParticipant] = useRemoveParticipantFromClassroomMutation();
  const studentId = userId;
  const classroomId = parseInt((router.query["id"] as string) ?? "0", 10);
  const handleDelete = async () => {
    try {
      await removeParticipant({ classroomId, studentId });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Modal opened={opened} onClose={close} centered>
        <div className="mx-8">
          <h2 className="text-left text-green-500 font-bold mb-8">
            ARE YOU SURE YOU WANT TO REMOVE {username ?? ""} FROM THE CLASSROOM?
          </h2>
          <div className="flex justify-end gap-2 my-4">
            <button
              onClick={close}
              className="bg-purple-700 text-white text-md px-4 py-2 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="bg-purple-700 text-white text-md py-2 rounded-md px-4"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>

      <button className="bg-transparent text-lg border-1" onClick={open}>
        <FaRegTrashCan className="text-purple-700" />
      </button>
    </div>
  );
}

export default function PeopleDetail({ id }: { id: number }) {
  const { data, isLoading, isError } = useProfileQuery(id.toString());
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Error loading student details. Please try again later.</p>;
  }

  if (data) {
    const { firstName, lastName } = data.userProfile ?? {};

    return (
      <div className="flex flex-row justify-between gap-2">
        <p>
          {firstName ?? ""} {lastName ?? ""} <SelfUserDetail id={id} />
        </p>
        <div className="flex flex-row justify-between gap-2">
          <p>{data?.email ?? ""}</p>
          <DeleteStudentPrompt id={id} username={`${firstName} ${lastName}`} />
        </div>
      </div>
    );
  }

  return null;
}
